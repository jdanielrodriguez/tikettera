<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\AuthMetodUser;
use App\Models\User;
use App\Models\Rol;
use App\Models\PasswordRecovery;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages(),
            ];
            return new Response($returnData, $returnData['status']);
        }

        try {
            $encript = new Encripter();
            $password = $encript->desencript($request->input('password'));

            if (!$encript->getValidSalt()) {
                $returnData = [
                    'status' => 404,
                    'msg' => 'Security Error',
                    'objeto' => null,
                ];
                return new Response($returnData, $returnData['status']);
            }

            $email = $request->input('email');
            $user = User::where('email', $email)->first();

            if (!$user) {
                $returnData = [
                    'status' => 401,
                    'msg' => 'Invalid Email',
                    'obj' => null,
                ];
                return new Response($returnData, $returnData['status']);
            }

            $credentials = ['email' => $email, 'password' => $password];
            if (!$token = JWTAuth::attempt($credentials)) {
                $returnData = [
                    'status' => 401,
                    'msg' => 'Invalid Password',
                    'obj' => null,
                ];
                return new Response($returnData, $returnData['status']);
            }

            $user->last_conection = Carbon::now('America/Guatemala');
            $user->token = $token;
            $user->save();

            $authMethod = AuthMetodUser::where('user_id', $user->id)
                ->where('auth_method_id', User::AUTH_METHOD_SIMPLE)
                ->first();

            if (!$authMethod) {
                $returnData = [
                    'status' => 400,
                    'msg' => 'Authentication Method Not Found',
                    'objeto' => null,
                ];
                return new Response($returnData, $returnData['status']);
            }

            $authMethod->update([
                'token' => $token,
                'last_conection' => Carbon::now('America/Guatemala'),
            ]);

            $returnData = [
                'status' => 200,
                'msg' => 'Login Successful',
                'objeto' => $encript->encript(mb_convert_encoding(json_encode($user), 'UTF-8', 'UTF-8')),
            ];
            return new Response($returnData, $returnData['status']);
        } catch (\Exception $e) {
            $returnData = [
                'status' => 500,
                'msg' => $e->getMessage(),
            ];
            return new Response($returnData, $returnData['status']);
        }
    }

    public function signUp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user' => 'required',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages()->toJson()
            ];
            return new Response($returnData, $returnData['status']);
        }

        $encript = new Encripter();
        $objectRequest = (object)[
            'user' => $request->get('user') ? json_decode(mb_convert_encoding($encript->desencript($request->get('user')), 'UTF-8', 'UTF-8')) : null,
        ];

        if (!$encript->getValidSalt()) {
            $returnData = [
                'status' => 404,
                'msg' => 'Security Error',
                'objeto' => null
            ];
            return new Response($returnData, $returnData['status']);
        }

        $email = $objectRequest->user->email;
        $email_exists = User::where('email', $email)->exists();

        if ($email_exists) {
            $returnData = [
                'status' => 200,
                'msg' => 'Already Registered',
                'objeto' => $encript->encript(mb_convert_encoding(json_encode(User::where('email', $email)->first()), 'UTF-8', 'UTF-8'))
            ];
            return new Response($returnData, $returnData['status']);
        }

        DB::beginTransaction();

        try {
            $user = User::create([
                'username' => $objectRequest->user->username ?? substr($email, 0, strpos($email, '@')),
                'password' => Hash::make($objectRequest->user->password),
                'email' => $email,
                'rol_id' => Rol::ROL_CLIENT,
                'state' => 1
            ]);

            $token = JWTAuth::fromUser($user);

            $user->update([
                'last_conection' => Carbon::now('America/Guatemala'),
                'token' => $token
            ]);

            AuthMetodUser::create([
                'token' => $token,
                'auth_method_id' => User::AUTH_METHOD_SIMPLE,
                'user_id' => $user->id,
                'last_conection' => Carbon::now('America/Guatemala')
            ]);

            EmailsController::enviarConfirm((object)['user' => $objectRequest->user], $user);

            DB::commit();

            $returnData = [
                'status' => 200,
                'msg' => 'User Registered Successfully',
                'objeto' => $encript->encript(mb_convert_encoding(json_encode($user), 'UTF-8', 'UTF-8'))
            ];
            return new Response($returnData, $returnData['status']);
        } catch (\Exception $e) {
            DB::rollback();
            $returnData = [
                'status' => 500,
                'msg' => $e->getMessage()
            ];
            return new Response($returnData, $returnData['status']);
        }
    }

    public function restorePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages()
            ];
            return new Response($returnData, $returnData['status']);
        }

        try {
            $email = base64_decode($request->get('email'));

            $user = User::where('email', $email)->orWhere('username', $email)->first();
            if (!$user) {
                $returnData = [
                    'status' => 404,
                    'msg' => 'No record found',
                    'objeto' => null
                ];
                return new Response($returnData, $returnData['status']);
            }

            $authMethod = AuthMetodUser::where('user_id', $user->id)->first();
            if (!$authMethod) {
                $returnData = [
                    'status' => 400,
                    'msg' => 'Error Auth Method',
                    'objeto' => null
                ];
                return new Response($returnData, $returnData['status']);
            }

            $encript = new Encripter();
            $faker = Faker::create();
            $token = $faker->regexify('[a-zA-Z0-9-_=+*%@!]{16}');
            $encodedToken = $encript->encript(mb_convert_encoding($token, 'UTF-8', 'UTF-8'));

            $passwordRecovery = new PasswordRecovery();
            $passwordRecovery->recovery_token = $token;
            $passwordRecovery->current_password = $user->password;
            $passwordRecovery->password = null;
            $passwordRecovery->password_rep = null;
            $passwordRecovery->state = 2; // 2 = Active recovery process
            $passwordRecovery->current_auth_method_id = User::AUTH_METHOD_SIMPLE;
            $passwordRecovery->auth_method_id = $authMethod->auth_method_id;
            $passwordRecovery->user_id = $user->id;
            $passwordRecovery->save();

            EmailsController::enviarRestoreLink($user, $encodedToken);

            $authMethod->auth_method_id = User::AUTH_METHOD_SIMPLE;
            $authMethod->save();

            $returnData = [
                'status' => 200,
                'msg' => 'Password reset link sent successfully',
                'objeto' => null
            ];
            return new Response($returnData, $returnData['status']);
        } catch (\Exception $e) {
            $returnData = [
                'status' => 500,
                'msg' => $e->getMessage(),
                'objeto' => null
            ];
            return new Response($returnData, $returnData['status']);
        }
    }

    public function recoveryPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uuid' => 'required',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages(),
            ];
            return new Response($returnData, $returnData['status']);
        }

        try {
            $encript = new Encripter();
            $decodedUUID = mb_convert_encoding($encript->desencript(base64_decode($request->get('uuid'))), 'UTF-8', 'UTF-8');

            if (!$encript->getValidSalt()) {
                $returnData = [
                    'status' => 404,
                    'msg' => 'Security Error',
                    'objeto' => null,
                ];
                return new Response($returnData, $returnData['status']);
            }

            $passwordRecovery = PasswordRecovery::where('recovery_token', $decodedUUID)
                ->where('current_auth_method_id', User::AUTH_METHOD_SIMPLE)
                ->where('state', 2) // 2 = Active recovery process
                ->orWhere('state', 1) // 1 = recovery used but not changed
                ->first();

            if (!$passwordRecovery) {
                $returnData = [
                    'status' => 404,
                    'msg' => 'Invalid or expired recovery token',
                    'objeto' => null,
                ];
                return new Response($returnData, $returnData['status']);
            }

            if ($passwordRecovery->state < 1) {
                $returnData = [
                    'status' => 400,
                    'msg' => 'Token already used or invalid',
                    'objeto' => null,
                ];
                return new Response($returnData, $returnData['status']);
            }

            // Update the recovery state to used
            $passwordRecovery->state = 1; // 1 = Token used
            $passwordRecovery->save();

            $user = User::find($passwordRecovery->user_id);
            if (!$user) {
                $returnData = [
                    'status' => 404,
                    'msg' => 'User not found',
                    'objeto' => null,
                ];
                return new Response($returnData, $returnData['status']);
            }

            $user->update(['state' => 2]); // 2 = Recovery in process

            $returnData = [
                'status' => 200,
                'msg' => 'Recovery token validated successfully',
                'objeto' => $encript->encript(mb_convert_encoding(json_encode($user), 'UTF-8', 'UTF-8')),
            ];
            return new Response($returnData, $returnData['status']);
        } catch (\Exception $e) {
            $returnData = [
                'status' => 500,
                'msg' => $e->getMessage(),
                'objeto' => null,
            ];
            return new Response($returnData, $returnData['status']);
        }
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'new_pass' => 'required|min:3',
            'new_pass_rep' => 'required|min:3',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages()
            ];
            return new Response($returnData, $returnData['status']);
        }

        try {
            $id = base64_decode($request->get('id'));
            $old_pass = $request->get('old_pass') ? base64_decode($request->get('old_pass')) : null;
            $new_pass = base64_decode($request->get('new_pass'));
            $new_pass_rep = base64_decode($request->get('new_pass_rep'));

            if ($new_pass !== $new_pass_rep) {
                $returnData = [
                    'status' => 404,
                    'msg' => 'Passwords do not match'
                ];
                return new Response($returnData, $returnData['status']);
            }

            if ($old_pass && $old_pass === $new_pass) {
                $returnData = [
                    'status' => 404,
                    'msg' => 'New password cannot be the same as the old password',
                ];
                return new Response($returnData, $returnData['status']);
            }

            $user = User::find($id);
            if (!$user) {
                $returnData = [
                    'status' => 404,
                    'msg' => 'User not found'
                ];
                return new Response($returnData, $returnData['status']);
            }

            // Validate old password if provided
            if ($old_pass && !Hash::check($old_pass, $user->password)) {
                $returnData = [
                    'status' => 404,
                    'msg' => 'Invalid Old Password'
                ];
                return new Response($returnData, $returnData['status']);
            }

            // Update user's password
            $user->password = Hash::make($new_pass);
            $user->state = 1; // Active after password change
            $user->save();

            // Send notification email
            EmailsController::enviarRecovery($user, $new_pass);

            // Invalidate old recovery tokens
            $recovery = PasswordRecovery::where('user_id', $user->id)
                ->where('current_auth_method_id', User::AUTH_METHOD_SIMPLE)
                ->where('state', 1) // Active tokens
                ->first();

            if ($recovery) {
                $recovery->state = 0; // Mark as used
                $recovery->save();
            }

            $encript = new Encripter();
            $returnData = [
                'status' => 200,
                'msg' => 'Password changed successfully',
                'objeto' => $encript->encript(mb_convert_encoding(json_encode($user), 'UTF-8', 'UTF-8')),
            ];
            return new Response($returnData, $returnData['status']);
        } catch (\Exception $e) {
            $returnData = [
                'status' => 500,
                'msg' => $e->getMessage()
            ];
            return new Response($returnData, $returnData['status']);
        }
    }

    public function sendNewPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages(),
            ];
            return new Response($returnData, $returnData['status']);
        }

        try {
            $email = base64_decode($request->get('email'));
            $user = User::where('email', $email)->orWhere('username', $email)->first();

            if (!$user) {
                $returnData = [
                    'status' => 404,
                    'msg' => 'User not found',
                    'objeto' => null,
                ];
                return new Response($returnData, $returnData['status']);
            }

            // Generate a new secure password
            $faker = Faker::create();
            $newPassword = $faker->regexify('[a-zA-Z0-9-_=+*%@!]{8,15}');

            // Update the user's password
            $user->update(['password' => Hash::make($newPassword)]);

            // Send recovery email
            $url = $request->get('url')
                ? base64_decode($request->get('url'))
                : 'https://www.tikettera.com';

            $user->url = $url;

            try {
                EmailsController::enviarRecovery($user, $newPassword);

                $returnData = [
                    'status' => 200,
                    'msg' => 'New password sent successfully',
                    'objeto' => null,
                ];
                return new Response($returnData, $returnData['status']);
            } catch (\Exception $e) {
                $returnData = [
                    'status' => 501,
                    'msg' => 'Error sending recovery email',
                    'objeto' => null,
                ];
                return new Response($returnData, $returnData['status']);
            }
        } catch (\Exception $e) {
            $returnData = [
                'status' => 500,
                'msg' => $e->getMessage(),
                'objeto' => null,
            ];
            return new Response($returnData, $returnData['status']);
        }
    }

    public function logout(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages(),
            ];
            return new Response($returnData, $returnData['status']);
        }

        try {
            $token = $request->input('token');
            JWTAuth::invalidate($token);

            $returnData = [
                'status' => 200,
                'msg' => 'You have successfully logged out.',
                'objeto' => null,
            ];
            return new Response($returnData, $returnData['status']);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            $returnData = [
                'status' => 401,
                'msg' => 'Token is invalid or has already been used.',
                'objeto' => null,
            ];
            return new Response($returnData, $returnData['status']);
        } catch (\Exception $e) {
            $returnData = [
                'status' => 500,
                'msg' => $e->getMessage(),
                'objeto' => null,
            ];
            return new Response($returnData, $returnData['status']);
        }
    }

    public function validarCaptcha(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages(),
            ];
            return new Response($returnData, $returnData['status']);
        }

        try {
            $data = http_build_query([
                'secret' => env('CAPTCHA_SECRET', 'TOKEN'),
                'response' => base64_decode($request->input('token')),
            ]);

            $curl = curl_init();
            $captcha_verify_url = env('CAPTCHA_URL', "https://www.google.com/recaptcha/api/siteverify");
            curl_setopt($curl, CURLOPT_URL, $captcha_verify_url);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

            $captcha_output = curl_exec($curl);
            if ($captcha_output === false) {
                throw new \Exception('Error communicating with CAPTCHA verification service.');
            }
            curl_close($curl);

            $decoded_captcha = json_decode($captcha_output, true);

            if (!$decoded_captcha || !isset($decoded_captcha['success']) || !$decoded_captcha['success']) {
                $returnData = [
                    'status' => 400,
                    'msg' => 'CAPTCHA verification failed',
                    'objeto' => $decoded_captcha,
                ];
                return new Response($returnData, $returnData['status']);
            }

            $returnData = [
                'status' => 200,
                'msg' => 'CAPTCHA verified successfully',
                'objeto' => $decoded_captcha,
            ];
            return new Response($returnData, $returnData['status']);
        } catch (\Exception $e) {
            $returnData = [
                'status' => 500,
                'msg' => $e->getMessage(),
                'objeto' => null,
            ];
            return new Response($returnData, $returnData['status']);
        }
    }
}

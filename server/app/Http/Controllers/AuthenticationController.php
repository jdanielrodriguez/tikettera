<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\AuthMetodUser;
use App\Models\User;
use App\Models\Rol;
use App\Models\PasswordRecovery;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Response;
use DB;
use Validator;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'  => 'required',
            'password'  => 'required'
        ]);
        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator
            ];
            return Response::json($returnData, $returnData['status']);
        }
        try {
            $encript = new Encripter();
            $userData = [
                'username'  => $request->get('username'),
                'password'  => $encript->desencript($request->get('password'))
            ];
            if (!$encript->getValidSalt()) {
                $returnData = [
                    'status' => 404,
                    'objeto' => null,
                    'msg' => "Error de seguridad"
                ];
                return Response::json($returnData, $returnData['status']);
            }
            $email = $request->get('email');
            $email_exists  = User::whereRaw("email = ?", $email)->first();
            if ($email_exists) {
                $userData['username'] = $email_exists->username;
                $token = JWTAuth::attempt($userData);
                if ($token) {
                    $last_conection = Carbon::now('America/Guatemala');
                    $user = User::find(Auth::user()->id);
                    $user->last_conection = $last_conection;
                    $user->token = $token;
                    $user->google_token = $request->get('google_token');
                    $user->google_id_token = $request->get('google_id_token');
                    $user->google_id = $request->get('google_id');
                    $authObj = AuthMetodUser::whereRaw("user_id = ? AND auth_method_id = ?",[$user->id, User::AUTH_METHOD_SIMPLE])->first();
                    if(!$authObj){
                        $returnData = [
                            'status' => 200,
                            'msg' => "Error Auth Method",
                            'objeto' => null
                        ];
                        return Response::json($returnData, $returnData['status']);
                    }
                    $authObj->token = $token;
                    $authObj->last_conection = $last_conection;
                    $authObj->save();

                    $user->save();
                    $returnData = [
                        'status' => 200,
                        'msg' => 'OK',
                        'objeto' => $encript->encript(mb_convert_encoding(json_encode($user), 'UTF-8', 'UTF-8'))
                    ];
                    return Response::json($returnData, $returnData['status']);
                }
                $returnData = [
                    'status' => 401,
                    'msg' => 'No valid Password',
                    'obj'=> null
                ];
                return Response::json($returnData, $returnData['status']);
            }
            $returnData = [
                'status' => 401,
                'msg' => 'No valid Email',
                'obj'=> null
            ];
            return Response::json($returnData, $returnData['status']);
        } catch (Exception $e) {
            $returnData = [
                'status' => 500,
                'msg' => $e->getMessage()
            ];
            return Response::json($returnData, $returnData['status']);
        }
    }

    function socialLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'google_id'  => 'required',
        ]);
        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Debe iniciar sesion con su red social.',
                'validator' => $validator
            ];
            return Response::json($returnData, $returnData['status']);
        }
        $email = $request->get('email');
        $google_id = $request->get('google_id');

        $user = User::whereRaw('email=? and (google_id=? OR facebook_id=?)', [$email, $google_id, $google_id])->first();
        if (!$user) {
            $returnData = [
                'status' => 401,
                'msg' => 'Usuario no encontrado.'
            ];
            return Response::json($returnData, $returnData['status']);
        }
        $userdata = [
            'username'  => $user->username,
            'password'  => $google_id
        ];
        $token = JWTAuth::attempt($userdata);
        if (!$token) {
            $user->password = Hash::make($google_id);
            $user->save();
            $token = JWTAuth::attempt($userdata);
            if (!$token) {
                $returnData = [
                    'status' => 401,
                    'msg' => 'Token error.'
                ];
                return Response::json($returnData, $returnData['status']);
            }
        }
        $last_conection = Carbon::now('America/Guatemala');
        $user->last_conection = $last_conection;
        $user->token = $token;
        $user->google_token = $request->get('google_token');
        $user->google_id_token = $request->get('google_id_token');
        $user->google_id = $google_id;
        $user->picture = $request->get('picture');
        $authObj = AuthMetodUser::whereRaw("user_id = ? AND auth_method_id != ?",[$user->id, User::AUTH_METHOD_SIMPLE])->first();
        if(!$authObj){
            $returnData = [
                'status' => 200,
                'msg' => "Error Auth Method",
                'objeto' => null
            ];
            return Response::json($returnData, $returnData['status']);
        }
        $authObj->token = $token;
        $authObj->last_conection = $last_conection;
        $authObj->save();
        $user->save();
        return Response::json($user, 200);
    }

    public function signUp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user'      => 'required',
        ]);
        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages()->toJson()
            ];
            return Response::json($returnData, $returnData['status']);
        }
        $encript = new Encripter();
        $objectRequest = (object)[
            "user" => $request->get('user') ? json_decode(mb_convert_encoding($encript->desencript($request->get('user')), 'UTF-8', 'UTF-8')) : null,
        ];
        if (!$encript->getValidSalt()) {
            $returnData = [
                'status' => 404,
                'objeto' => null,
                'msg' => "Error de seguridad"
            ];
            return Response::json($returnData, $returnData['status']);
        }
        $email = $objectRequest->user->email;
        $email_exists  = User::whereRaw("email = ?", $email)->count();
        $user = $objectRequest->user->username;
        $user_exists  = User::whereRaw("username = ?", $user)->count();
        // Registro de usuario Nuevo
        if ($email_exists == 0) {
            DB::beginTransaction();
            $userController = new UsersController();
            if ($user_exists > 0) {
                $objectRequest->user->username = $user . ($user_exists + 1);
            }
            $newObject = $userController->createClientFromObject($objectRequest->user);
            $userdata = [
                'username'  => $user,
                'password'  => $objectRequest->user->password
            ];
            $newObject->save();
            $objectSee = User::whereRaw('id=?', $newObject->id)->first();
            if ($objectSee) {
                $token = JWTAuth::attempt($userdata);
                if ($token) {
                    try {
                        EmailsController::enviarConfirm($objectRequest, $objectSee);
                    } catch (Exception $e) {
                        DB::rollback();
                    } finally {
                        $last_conection = Carbon::now('America/Guatemala');
                        $objectSee->last_conection = $last_conection;
                        $objectSee->token = $token;
                        $objectSee->save();
                        $authObj = new AuthMetodUser();
                        $authObj->token = $token;
                        $authObj->auth_method_id = User::AUTH_METHOD_SIMPLE;
                        $authObj->user_id = $objectSee->id;
                        $authObj->time_out = null;
                        $authObj->readonly = 1;
                        $authObj->last_conection = $last_conection;
                        $authObj->save();
                        DB::commit();
                        $returnData = [
                            'status' => 200,
                            'msg' => 'OK',
                            'objeto' => $encript->encript(mb_convert_encoding(json_encode($objectSee), 'UTF-8', 'UTF-8'))
                        ];
                    }
                    return Response::json($returnData, $returnData['status']);
                } else {
                    DB::rollback();
                    $returnData = [
                        'status' => 405,
                        'msg' => 'Token error'
                    ];
                    return Response::json($returnData, $returnData['status']);
                }
            } else {
                DB::rollback();
                $returnData = [
                    'status' => 404,
                    'msg' => 'Error creando el usuario'
                ];
                return Response::json($returnData, $returnData['status']);
            }
        }

        // Usuario Nuevo ya existe
        if ($email_exists > 0) {
            DB::beginTransaction();
            $objectSee = User::whereRaw("email = ?", $email)->first();
            $authCount = AuthMetodUser::whereRaw("user_id = ? AND auth_method_id = ?",[$objectSee->id, User::AUTH_METHOD_SIMPLE])->count();
            if($authCount == 0){
                $returnData = [
                    'status' => 200,
                    'msg' => "Error Auth Method",
                    'objeto' => null
                ];
                return Response::json($returnData, $returnData['status']);
            }
            $objectSee->rol_id = Rol::ROL_CLIENT;
            $objectSee->save();
            DB::commit();
            $returnData = [
                'status' => 200,
                'msg' => "Already Registered",
                'objeto' => $encript->encript(mb_convert_encoding(json_encode($objectSee), 'UTF-8', 'UTF-8'))
            ];
            return Response::json($returnData, $returnData['status']);
        }
    }

    public function restorePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'  => 'required',
        ]);
        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator
            ];
            return Response::json($returnData, $returnData['status']);
        }
        $email = base64_decode($request->get('email'));
        $objectUser = User::whereRaw('email=? or username=?', [$email, $email])->first();
        if (!$objectUser) {
            $returnData = [
                'status' => 404,
                'msg' => 'No record found'
            ];
            return Response::json($returnData, $returnData['status']);
        }
        try {
            $authObj = AuthMetodUser::whereRaw("user_id = ?",$objectUser->id)->first();
            if(!$authObj){
                $returnData = [
                    'status' => 400,
                    'msg' => "Error Auth Method",
                    'objeto' => null
                ];
                return Response::json($returnData, $returnData['status']);
            }
            $encript = new Encripter();
            $faker = Faker::create();
            $fake = $faker->regexify('[a-zA-Z0-9-_=+*%@!]{8,15}');
            $uuid = $encript->encript(mb_convert_encoding(json_encode($fake), 'UTF-8', 'UTF-8'));
            $passRecovery = new PasswordRecovery();
            $passRecovery->uuid = $fake;
            $passRecovery->current_password = $objectUser->password;
            $passRecovery->password = null;
            $passRecovery->password_rep = null;
            $passRecovery->state = 2;
            $passRecovery->current_auth_method_id = User::AUTH_METHOD_SIMPLE;
            $passRecovery->auth_method_id = $authObj->auth_method_id;
            $passRecovery->user_id = $objectUser->id;
            $passRecovery->save();
            EmailsController::enviarRestoreLink($objectUser, $uuid);
            $authObj->auth_method_id = User::AUTH_METHOD_SIMPLE;
            $authObj->save();
            $returnData = [
                'status' => 200,
                'msg' => "Password was sent",
                'objeto' => null
            ];
            return Response::json($returnData, $returnData['status']);
        } catch (Exception $e) {
            $returnData = [
                'status' => 500,
                'msg' => $e->getMessage()
            ];
            return Response::json($returnData, $returnData['status']);
        }
    }

    public function recoveryPassword(Request $request)
    {
        $encript = new Encripter();
        $objectRequest = (object)[
            "user" => $request->get('uuid') ? json_decode(mb_convert_encoding($encript->desencript($request->get('uuid')), 'UTF-8', 'UTF-8')) : null,
        ];
        if (!$encript->getValidSalt()) {
            $returnData = [
                'status' => 404,
                'objeto' => null,
                'msg' => "Error de seguridad"
            ];
            return Response::json($returnData, $returnData['status']);
        }
        $objectUpdate = User::whereRaw('email=? or username=?', [base64_decode($request->get('email')), base64_decode($request->get('email'))])->first();

        if ($objectUpdate) {
            try {
                $faker = Faker::create();
                $fake = $faker->regexify('[a-zA-Z0-9-_=+*%@!]{8,15}');
                $uuid = $encript->encript(mb_convert_encoding(json_encode($fake), 'UTF-8', 'UTF-8'));
                try {
                    EmailsController::enviarRecovery($objectUpdate, $pass);
                    $returnData = [
                        'status' => 200,
                        'msg' => "Password was sent",
                        'objeto' => null
                    ];
                    return Response::json($returnData, $returnData['status']);
                } catch (Exception $e) {
                    $returnData = [
                        'status' => 501,
                        'msg' => "Error sending email.",
                        'objeto' => null
                    ];
                    return Response::json($returnData, $returnData['status']);
                }
            } catch (Exception $e) {
                $returnData = [
                    'status' => 500,
                    'msg' => $e->getMessage()
                ];
                return Response::json($returnData, $returnData['status']);
            }
        } else {
            $returnData = [
                'status' => 404,
                'msg' => 'No record found'
            ];
            return Response::json($returnData, 404);
        }
    }

    public function sendNewPassword(Request $request)
    {
        $objectUpdate = User::whereRaw('email=? or username=?', [base64_decode($request->get('email')), base64_decode($request->get('email'))])->first();
        if ($objectUpdate) {
            try {
                $faker = Faker::create();
                $pass = $faker->regexify('[a-zA-Z0-9-_=+*%@!]{8,15}');
                $objectUpdate->password = Hash::make($pass);
                $objectUpdate->save();
                $objectUpdate->url = $request->get('url') ? base64_decode($request->get('url')) : 'https://www.tikettera.com';
                try {
                    EmailsController::enviarRecovery($objectUpdate, $pass);
                    $returnData = [
                        'status' => 200,
                        'msg' => "Password was sent",
                        'objeto' => null
                    ];
                    return Response::json($returnData, $returnData['status']);
                } catch (Exception $e) {
                    $returnData = [
                        'status' => 501,
                        'msg' => "Error sending email.",
                        'objeto' => null
                    ];
                    return Response::json($returnData, $returnData['status']);
                }
            } catch (Exception $e) {
                $returnData = [
                    'status' => 500,
                    'msg' => $e->getMessage()
                ];
                return Response::json($returnData, $returnData['status']);
            }
        } else {
            $returnData = [
                'status' => 404,
                'msg' => 'No record found'
            ];
            return Response::json($returnData, 404);
        }
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'        => 'required',
            'new_pass'  => 'required|min:3',
            'old_pass'  => 'required'
        ]);
        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages()->toJson()
            ];
            return Response::json($returnData, $returnData['status']);
        }
        $id = base64_decode($request->get('id'));
        $old_pass = base64_decode($request->get('old_pass'));
        $new_pass_rep = base64_decode($request->get('new_pass_rep'));
        $new_pass = base64_decode($request->get('new_pass'));
        if ($new_pass_rep != $new_pass) {
            $returnData = [
                'status' => 404,
                'msg' => 'Passwords do not match'
            ];
            return Response::json($returnData, $returnData['status']);
        }
        if ($old_pass == $new_pass) {
            $returnData = [
                'status' => 404,
                'msg' => 'New passwords it is same the old password'
            ];
            return Response::json($returnData, $returnData['status']);
        }
        $objectUpdate = User::find($id);
        if (!$objectUpdate) {
            $returnData = [
                'status' => 404,
                'msg' => 'No record found'
            ];
            return Response::json($returnData, $returnData['status']);
        }
        try {
            $isOldValid = Hash::check($old_pass, $objectUpdate->password);
            if (!$isOldValid) {
                $returnData = [
                    'status' => 404,
                    'msg' => 'Invalid Password'
                ];
                return Response::json($returnData, $returnData['status']);
            }
            $objectUpdate->password = Hash::make($new_pass);
            $objectUpdate->estado = 1;
            $objectUpdate->save();
            return Response::json($objectUpdate, 200);

        } catch (Exception $e) {
            $returnData = [
                'status' => 500,
                'msg' => $e->getMessage()
            ];
            return Response::json($returnData, $returnData['status']);
        }
    }

    public function logout(Request $request)
    {
        $this->validate($request, ['token' => 'required']);

        try {
            JWTAuth::invalidate($request->input('token'));
            return response([
                'status' => 'success',
                'msg' => 'You have successfully logged out.'
            ]);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response([
                'status' => 'error',
                'msg' => 'Failed to logout, please try again.'
            ]);
        }
    }

    public function validarCaptcha(Request $request)
    {
        $data = http_build_query([
            'secret' => env('CAPTCHA_SECRET', 'TOKEN'),
            'response' => base64_decode($request->get('token'))
        ]);
        $curl = curl_init();
        $captcha_verify_url = env('CAPTCHA_URL', "https://www.google.com/recaptcha/api/siteverify");
        curl_setopt($curl, CURLOPT_URL, $captcha_verify_url);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $captcha_output = curl_exec($curl);
        curl_close($curl);
        $decoded_captcha = json_decode($captcha_output);
        $returnData = [
            'status' => 200,
            'objeto' => $decoded_captcha
        ];
        return Response::json($returnData, $returnData['status']);
    }
}

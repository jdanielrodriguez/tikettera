<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use App\Models\Rol;
use Carbon\Carbon;
use Response;
use DB;
use Validator;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username'  => 'required',
            'password'  => 'required'
        ]);
        if ($validator->fails()) {
            $returnData = array(
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator
            );
            return Response::json($returnData, 400);
        } else {
            try {
                $validator = Validator::make($request->all(), [
                    'username'  => 'email',
                ]);
                $userdata = array();
                $encript = new Encripter();
                if ($validator->fails()) {
                    $userdata = array(
                        'username'  => $request->get('username'),
                        'password'  => $encript->desencript($request->get('password'))
                    );
                } else {
                    // $field = (preg_match('/^[A-z0-9\\._-]+@[A-z0-9][A-z0-9-]*(\\.[A-z0-9_-]+)*\\.([A-z]{2,6})$/', $request->get('username'), null)) ? 'email' : 'username';
                    $userdata = array(
                        'email'  => $request->get('username'),
                        'password'  => $encript->desencript($request->get('password'))
                    );
                }
                if (!$encript->getValidSalt()) {
                    $returnData = array(
                        'status' => 404,
                        'objeto' => null,
                        'msg' => "Error de seguridad"
                    );
                    return Response::json($returnData, 200);
                }
                $token = JWTAuth::attempt($userdata);
                if ($token) {
                    $user = User::find(Auth::user()->id);
                    $user->last_conection = date('Y-m-d H:i:s');
                    $user->token = ($token);
                    $user->google_token = $request->get('google_token');
                    $user->google_idToken = $request->get('google_idToken');
                    $user->google_id = $request->get('google_id');
                    $user->picture = $request->get('picture');
                    $user->save();
                    $user = User::with('rol', 'imagenes', 'proveedores', 'clientes', 'empleados', 'direcciones', 'formasPago')->find($user->id);
                    return Response::json($user, 200);
                } else {
                    if ($request->get('google_id') !== null) {
                        $user = User::whereRaw('email=? and (google_id=? OR facebook_id=?)', [$request->get('email'), $request->get('google_id'), $request->get('google_id')])->first();
                        if ($user) {
                            $user->password = Hash::make($request->get('google_id'));
                            $user->save();
                            $userdata = array(
                                'username'  => $request->get('username'),
                                'password'  => $request->get('google_id')
                            );
                            $token = JWTAuth::attempt($userdata);
                            if ($token) {
                                $user = User::find(Auth::user()->id);
                                $user->last_conection = date('Y-m-d H:i:s');
                                $user->token = ($token);
                                $user->google_token = $request->get('google_token');
                                $user->google_idToken = $request->get('google_idToken');
                                $user->google_id = $request->get('google_id');
                                $user->picture = $request->get('picture');
                                $user->save();
                                $user = User::with('rol', 'imagenes', 'proveedores', 'clientes', 'empleados', 'direcciones', 'formasPago')->find($user->id);
                                return Response::json($user, 200);
                            } else {
                                $returnData = array(
                                    'status' => 401,
                                    'msg' => 'Token error.'
                                );
                                return Response::json($returnData, 401);
                            }
                        } else {
                            $returnData = array(
                                'status' => 401,
                                'msg' => 'Usuario no encontrado.'
                            );
                            return Response::json($returnData, 401);
                        }
                    } else {
                        $returnData = array(
                            'status' => 404,
                            'msg' => 'Debe iniciar sesion con su red social.'
                        );
                        return Response::json($returnData, 404);
                    }
                    $returnData = array(
                        'status' => 401,
                        'msg' => 'No valid Username or Password'
                    );
                    return Response::json($returnData, 401);
                }
                return Response::json($newObject, 200);
            } catch (Exception $e) {
                $returnData = array(
                    'status' => 500,
                    'msg' => $e->getMessage()
                );
                return Response::json($returnData, 500);
            }
        }
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
                        $objectSee->last_conection = Carbon::now('America/Guatemala');
                        $objectSee->token = $token;
                        $objectSee->save();
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

    public function resetPassword(Request $request)
    {
        $objectUpdate = User::whereRaw('email=? or username=?', [base64_decode($request->get('username')), base64_decode($request->get('username'))])->with('proveedores', 'clientes')->first();
        if ($objectUpdate) {
            try {
                $faker = Faker::create();
                // $pass = $faker->password(8,15,true,true);
                $pass = $faker->regexify('[a-zA-Z0-9-_=+*%@!]{8,15}');
                $objectUpdate->password = Hash::make($pass);
                $objectUpdate->estado = 21;
                $objectUpdate->save();
                $objectUpdate->nombreProveedor = count($objectUpdate->proveedores) > 0 ? $objectUpdate->proveedores[0]->nombre : (count($objectUpdate->clientes) > 0 ? $objectUpdate->clientes[0]->nombre : "INGRESAR NOMBRE");
                $objectUpdate->nombreMostrar = $request->get('nombre') ? base64_decode($request->get('nombre')) : 'Ordenes Online';
                $objectUpdate->empresaMostrar = $request->get('empresa') ? base64_decode($request->get('empresa')) : 'Ordenes Online';
                $objectUpdate->correoMostar = $request->get('correo') ? base64_decode($request->get('correo')) : 'send@ordenes.online';
                $objectUpdate->url = $request->get('url') ? base64_decode($request->get('url')) : 'https://www.ordenes.online/inicio';
                EmailsController::enviarRecovery($objectUpdate, $pass);
                $returnData = array(
                    'status' => 200,
                    'objeto' => $objectUpdate
                );
                return Response::json($returnData, 200);
            } catch (Exception $e) {
                $returnData = array(
                    'status' => 500,
                    'msg' => $e->getMessage()
                );
                return Response::json($returnData, 500);
            }
        } else {
            $returnData = array(
                'status' => 404,
                'msg' => 'No record found'
            );
            return Response::json($returnData, 404);
        }
    }

    public function changePassword(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'new_pass' => 'required|min:3',
            'old_pass'      => 'required'
        ]);

        if ($validator->fails()) {
            $returnData = array(
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages()->toJson()
            );
            return Response::json($returnData, 400);
        } else {
            $old_pass = base64_decode($request->get('old_pass'));
            $new_pass_rep = base64_decode($request->get('new_pass_rep'));
            $new_pass = base64_decode($request->get('new_pass'));
            $objectUpdate = User::find($id);
            if ($objectUpdate) {
                try {
                    if (Hash::check($old_pass, $objectUpdate->password)) {
                        if ($new_pass_rep != $new_pass) {
                            $returnData = array(
                                'status' => 404,
                                'msg' => 'Passwords do not match'
                            );
                            return Response::json($returnData, 404);
                        }

                        if ($old_pass == $new_pass) {
                            $returnData = array(
                                'status' => 404,
                                'msg' => 'New passwords it is same the old password'
                            );
                            return Response::json($returnData, 404);
                        }
                        $objectUpdate->password = Hash::make($new_pass);
                        $objectUpdate->estado = 1;
                        $objectUpdate->save();

                        return Response::json($objectUpdate, 200);
                    } else {
                        $returnData = array(
                            'status' => 404,
                            'msg' => 'Invalid Password'
                        );
                        return Response::json($returnData, 404);
                    }
                } catch (Exception $e) {
                    $returnData = array(
                        'status' => 500,
                        'msg' => $e->getMessage()
                    );
                }
            } else {
                $returnData = array(
                    'status' => 404,
                    'msg' => 'No record found'
                );
                return Response::json($returnData, 404);
            }
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

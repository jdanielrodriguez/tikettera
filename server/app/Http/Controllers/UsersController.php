<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        $encript = new Encripter();
        $returnData = array(
            'status' => $user ? 200 : 404,
            'msg' => $user ? 'Perfil returned.' : 'No record found',
            'objeto' => $encript->encript(mb_convert_encoding(json_encode($user), 'UTF-8', 'UTF-8')),
        );
        return new Response($returnData, $returnData['status']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                $returnData = array(
                    'status' => 404,
                    'msg' => 'No record found',
                    'objeto' => null,
                );
                return new Response($returnData, $returnData['status']);
            }

            $validator = Validator::make($request->all(), [
                'username' => 'sometimes|string|max:255',
                'password' => 'sometimes|string|min:6',
                'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
                'names' => 'sometimes|string|max:255',
                'lastnames' => 'sometimes|max:255',
                'picture' => 'sometimes|string',
            ]);

            if ($validator->fails()) {
                $returnData = array(
                    'status' => 422,
                    'msg' => $validator->errors()->first(),
                    'objeto' => null,
                );
                return new Response($returnData, $returnData['status']);
            }

            $user->username = $request->input('username', $user->username);
            $user->email = $request->input('email', $user->email);
            $user->names = $request->input('names', $user->names);
            $user->lastnames = $request->input('lastnames', $user->lastnames);

            if ($request->filled('password')) {
                $user->password = Hash::make($request->input('password'));
            }

            if ($request->input('picture')) {
                $imageController = new S3Controller();
                $uploadedUrl = $imageController->uploadImage($request->input('picture'), 'profile_pictures');

                if ($uploadedUrl) {
                    $user->picture = $uploadedUrl;
                } else {
                    $returnData = array(
                        'status' => 500,
                        'msg' => 'Error uploading image',
                        'objeto' => null,
                    );
                    return new Response($returnData, $returnData['status']);
                }
            } else {
                if ($user->picture) {
                    $imageController = new S3Controller();
                    $deleteSuccess = $imageController->deleteImage($user->picture);

                    if ($deleteSuccess) {
                        $user->picture = null;
                    } else {
                        $returnData = array(
                            'status' => 500,
                            'msg' => 'Error deleting image',
                            'objeto' => null,
                        );
                        return new Response($returnData, $returnData['status']);
                    }
                }
            }


            $user->save();

            $encript = new Encripter();
            $returnData = array(
                'status' => 200,
                'msg' => 'Perfil actualizado con éxito.',
                'objeto' => $encript->encript(mb_convert_encoding(json_encode($user), 'UTF-8', 'UTF-8')),
            );
            return new Response($returnData, $returnData['status']);
        } catch (\Exception $e) {
            $returnData = array(
                'status' => 500,
                'msg' => 'Error al actualizar el perfil.',
                'objeto' => null,
                'error' => $e->getMessage(),
            );
            return new Response($returnData, $returnData['status']);
        }
    }
}

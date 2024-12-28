<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use App\Models\Rol;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
                    'msg' => 'User not found',
                    'error' => null
                );
                return new Response($returnData, $returnData['status']);
            }

            // Validaciones
            $validator = Validator::make($request->all(), [
                'username' => 'sometimes|string|max:255',
                'password' => 'sometimes|string|min:6',
                'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
                'names' => 'sometimes|string|max:255',
                'lastnames' => 'sometimes|max:255',
                'picture' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                $returnData = array(
                    'status' => 422,
                    'msg' => $validator->errors(),
                    'error' => $validator->errors()
                );
                return new Response($returnData, $returnData['status']);

            }

            // Actualizar campos
            $user->username = $request->input('username', $user->username);
            $user->email = $request->input('email', $user->email);
            $user->names = $request->input('names', $user->names);
            $user->lastnames = $request->input('lastnames', $user->lastnames);

            if ($request->filled('password')) {
                $user->password = Hash::make($request->input('password'));
            }

            // Manejo de la imagen
            if ($request->input('picture')) {
                $imageData = base64_decode($request->input('picture'));
                $imageName = 'profile_' . time() . '.png';
                $path = 'profile_pictures/' . $imageName;

                Storage::put($path, $imageData);

                // Actualiza la ruta de la imagen en el usuario
                $user->picture = $path;
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
                'error' => $e->getMessage()
            );
            return new Response($returnData, $returnData['status']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

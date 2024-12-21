<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use App\Models\Rol;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

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

    public function createClientFromObject($user)
    {
        $newObject = new User();
        $newObject->username = $user->username ? $user->username : null;
        if ($user->password) {
            $newObject->password = Hash::make($user->password);
        }
        $newObject->email = $user->email ? $user->email : null;
        $newObject->names = $user->names ? $user->names : null;
        $newObject->lastnames = $user->lastnames ? $user->lastnames : null;
        $newObject->picture = $user->picture ? $user->picture : null;
        $newObject->rol_id = Rol::ROL_CLIENT;
        $newObject->twitter_id = $user->twitter_id ? $user->twitter_id : null;
        $newObject->tiktok_id = $user->tiktok_id ? $user->tiktok_id : null;
        $newObject->google_id = $user->google_id ? $user->google_id : null;
        $newObject->facebook_id = $user->facebook_id ? $user->facebook_id : null;
        $newObject->google_token = $user->google_token ? $user->google_token : null;
        $newObject->auth_type = $user->auth_type ? $user->auth_type : null;
        $newObject->state = $user->state ? $user->state : null;
        $newObject->two_factor_secret = $user->two_factor_secret ? $user->two_factor_secret : null;
        $newObject->two_factor_recovery_codes = $user->two_factor_recovery_codes ? $user->two_factor_recovery_codes : null;
        $newObject->token = $user->token ? $user->token : null;

        return $newObject;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $objectSee = User::find($id);
        if (!$objectSee) {
            $returnData = array(
                'status' => 404,
                'message' => 'No record found'
            );
            return new Response($returnData, $returnData['status']);
        }
        $returnData = array(
            'status' => 200,
            'msg' => 'Event Returned',
            'data' => $objectSee
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
        //
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

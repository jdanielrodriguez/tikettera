<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Locality;
class LocalitiesController extends Controller
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getActiveLocatilties()
    {
        $nowDate = date('Y-m-d');
        $nowTime = date('H:i:s');
        $objectSee = Locality::whereRaw("date_start >= ? and time_start > ? and state = 1",[$nowDate, $nowTime])->get();
        if ($objectSee) {
            $returnData = array(
                'status' => 200,
                'msg' => 'Localities Returned',
                'objReturn' => $objectSee
            );
            return new Response($returnData, $returnData['status']);
        }
        else {
            $returnData = array (
                'status' => 404,
                'message' => 'No record found'
            );
            return new Response($returnData, $returnData['status']);
        }
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
        $objectSee = Locality::find($id);
        if ($objectSee) {
            $returnData = array(
                'status' => 200,
                'msg' => 'Locality Returned',
                'objReturn' => $objectSee
            );
            return new Response($returnData, $returnData['status']);

        }
        else {
            $returnData = array (
                'status' => 404,
                'message' => 'No record found'
            );
            return new Response($returnData, $returnData['status']);
        }
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

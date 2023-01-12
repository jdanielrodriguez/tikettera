<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Event;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $objectList = Event::all();
        $count = count($objectList);
        if ($objectList) {
            $returnData = array(
                'status' => 200,
                'msg' => 'Events Returned',
                'count' => $count,
                'data' => $objectList
            );
            return new Response($returnData, $returnData['status']);
        }

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getActives()
    {
        $nowDate = date('Y-m-d');
        $nowTime = date('H:i:s');
        $objectSee = Event::whereRaw("date_start > ? or (date_start = ? and time_start > ?) and state = 1",[$nowDate, $nowDate, $nowTime])->get();
        $count = count(Event::all());
        if ($objectSee) {
            $returnData = array(
                'status' => 200,
                'msg' => 'Events Returned',
                'count' => $count,
                'data' => $objectSee
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
        $objectSee = Event::find($id);
        if ($objectSee) {
            $returnData = array(
                'status' => 200,
                'msg' => 'Event Returned',
                'data' => $objectSee
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
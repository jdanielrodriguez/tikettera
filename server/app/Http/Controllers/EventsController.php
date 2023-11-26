<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Event;
use App\Models\Locality;

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
            $returnData = [
                'status' => 200,
                'msg' => 'Events Returned',
                'count' => $count,
                'data' => $objectList
            ];
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
        $objectSee = Event::whereRaw("date_start > ? or (date_start = ? and time_start > ?) and state = 1", [$nowDate, $nowDate, $nowTime])->get();
        $count = count(Event::all());
        if (!$objectSee) {
            $returnData = [
                'status' => 404,
                'message' => 'No record found'
            ];
            return new Response($returnData, $returnData['status']);
        }
        $returnData = [
            'status' => 200,
            'msg' => 'Events Returned',
            'count' => $count,
            'objeto' => $objectSee
        ];
        return new Response($returnData, $returnData['status']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getLocalities($slug)
    {
        $encript = new Encripter();
        $id = $slug ? json_decode(mb_convert_encoding($encript->desencript($slug), 'UTF-8', 'UTF-8')) : null;
        if (!$encript->getValidSalt()) {
            $returnData = [
                'status' => 404,
                'objeto' => null,
                'msg' => "Error de seguridad"
            ];
            return Response::json($returnData, $returnData['status']);
        }
        $objectSee = Event::whereRaw("slug = ? and state = 1", $id)->with('localities')->first();
        if (!$objectSee) {
            $returnData = [
                'status' => 404,
                'message' => 'No record found'
            ];
            return new Response($returnData, $returnData['status']);
        }
        $returnData = [
            'status' => 200,
            'msg' => 'Events Returned',
            'objeto' => $objectSee
        ];
        return new Response($returnData, $returnData['status']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getLocality($event_slug, $slug)
    {
        $encript = new Encripter();
        $event_slug = $event_slug ? json_decode(mb_convert_encoding($encript->desencript($event_slug), 'UTF-8', 'UTF-8')) : null;
        $slug = $slug ? json_decode(mb_convert_encoding($encript->desencript($slug), 'UTF-8', 'UTF-8')) : null;
        if (!$encript->getValidSalt()) {
            $returnData = [
                'status' => 404,
                'objeto' => null,
                'msg' => "Error de seguridad"
            ];
            return Response::json($returnData, $returnData['status']);
        }
        $event = Event::whereRaw("slug = ? and state = 1", $event_slug)->first();
        $objectSee = Locality::whereRaw("slug = ? and state = 1 and event_id = ?", [$slug, $event->id])->with('places')->first();
        if (!$objectSee) {
            $returnData = [
                'status' => 404,
                'message' => 'No record found'
            ];
            return new Response($returnData, $returnData['status']);
        }
        $returnData = [
            'status' => 200,
            'msg' => 'Locality Returned',
            'objeto' => $objectSee
        ];
        return new Response($returnData, $returnData['status']);
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

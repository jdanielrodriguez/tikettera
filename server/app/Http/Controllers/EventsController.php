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
        $objectList = Event::where('state', 1)->get();
        $count = $objectList->count();

        $returnData = [
            'status' => 200,
            'msg' => $count > 0 ? 'Events Returned' : 'No Events Found',
            'count' => $count,
            'data' => $objectList
        ];
        return new Response($returnData, $returnData['status']);
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

        $objectSee = Event::whereRaw("(date_start > ? OR (date_start = ? AND time_start > ?)) AND state = 1", [$nowDate, $nowDate, $nowTime])->get();
        $count = $objectSee->count();

        $returnData = [
            'status' => $count > 0 ? 200 : 404,
            'msg' => $count > 0 ? 'Active Events Returned' : 'No Active Events Found',
            'count' => $count,
            'objeto' => $count > 0 ? $objectSee : null
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
            return new Response($returnData, $returnData['status']);
        }

        $objectSee = Event::where('slug', $id)->where('state', 1)->with('localities')->first();

        $returnData = [
            'status' => $objectSee ? 200 : 404,
            'msg' => $objectSee ?'Localities Returned' : 'No record found',
            'cripto' => $objectSee ? $encript->encript(mb_convert_encoding(json_encode($objectSee), 'UTF-8', 'UTF-8')) : '',
            'objeto' => null
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
            return new Response($returnData, $returnData['status']);
        }

        $event = Event::where('slug', $event_slug)->where('state', 1)->first();

        if (!$event) {
            $returnData = [
                'status' => 404,
                'msg' => 'Event not found',
                'objeto' => null
            ];
            return new Response($returnData, $returnData['status']);
        }

        $objectSee = Locality::where('slug', $slug)->where('state', 1)->where('event_id', $event->id)->with('places')->first();

        $returnData = [
            'status' => $objectSee ? 200 : 404,
            'msg' => $objectSee ? 'Locality Returned' : 'Locality not found',
            'objeto' => $objectSee
        ];
        return new Response($returnData, $returnData['status']);
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


        $returnData = [
            'status' => $objectSee ? 200 : 404,
            'msg' => $objectSee ? 'Event Returned' : 'No record found',
            'objeto' => $objectSee
        ];
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

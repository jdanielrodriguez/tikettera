<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Event;
use App\Models\Locality;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource filtered by user_id.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'nullable|integer|exists:users,id',
        ]);

        $query = Event::query();

        if (isset($validatedData['user_id'])) {
            $query->where('user_id', $validatedData['user_id']);
        }

        $objectList = $query->get();
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
     * @param string $slug
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function getLocalities($slug, Request $request)
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

        $validatedData = $request->validate([
            'state' => 'nullable|integer',
        ]);

        $query = Event::where('slug', $id);

        if (isset($validatedData['state'])) {
            $query->where('state', $validatedData['state']);
        }

        $objectSee = $query->with('localities')->first();

        $returnData = [
            'status' => $objectSee ? 200 : 404,
            'msg' => $objectSee ? 'Localities Returned' : 'No record found',
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
        // Validar los datos de entrada
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:events,slug|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'time_start' => 'nullable|date_format:H:i:s',
            'time_end' => 'nullable|date_format:H:i:s',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
            'user_id' => 'nullable|numeric|exists:users,id',
            'reason_id' => 'nullable|integer|exists:events_reason,id',
            'type_id' => 'nullable|integer|exists:events_type,id',
            'state' => 'nullable|integer',
            'picture' => 'nullable|string',
        ]);

        // Crear el evento
        $event = Event::create($validatedData);

        $returnData = [
            'status' => 201,
            'msg' => 'Event created successfully',
            'objeto' => $event
        ];
        return new Response($returnData, $returnData['status']);
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
        // Validar los datos de entrada
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'slug' => 'nullable|string|unique:events,slug,' . $id . '|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'time_start' => 'nullable|date_format:H:i:s',
            'time_end' => 'nullable|date_format:H:i:s',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date',
            'user_id' => 'nullable|numeric|exists:users,id',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
            'reason_id' => 'nullable|integer|exists:events_reason,id',
            'type_id' => 'nullable|integer|exists:events_type,id',
            'state' => 'nullable|integer',
            'picture' => 'nullable|string',
        ]);

        // Buscar el evento
        $event = Event::find($id);

        if (!$event) {
            $returnData = [
                'status' => 404,
                'msg' => 'Event not found',
                'objeto' => null
            ];
            return new Response($returnData, $returnData['status']);
        }

        // Actualizar el evento
        $event->update($validatedData);

        $returnData = [
            'status' => 200,
            'msg' => 'Event updated successfully',
            'objeto' => $event
        ];
        return new Response($returnData, $returnData['status']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Buscar el evento
        $event = Event::find($id);

        if (!$event) {
            $returnData = [
                'status' => 404,
                'msg' => 'Event not found',
                'objeto' => null
            ];
            return new Response($returnData, $returnData['status']);
        }

        // Marcar como eliminado (soft delete)
        $event->state = 0; // O cualquier otro valor que uses para indicar eliminación lógica
        $event->save();

        $returnData = [
            'status' => 200,
            'msg' => 'Event deleted successfully',
            'objeto' => null
        ];
        return new Response($returnData, $returnData['status']);
    }
}

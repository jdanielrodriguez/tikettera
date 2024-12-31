<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Advertisement;
use App\Models\AdvertisementsDiscount;

class AdvertisementController extends Controller
{
    /**
     * Display a listing of advertisements.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $advertisements = Advertisement::all();
        $count = $advertisements->count();

        $returnData = [
            'status' => 200,
            'msg' => 'Advertisements Retrieved',
            'count' => $count,
            'objeto' => $advertisements
        ];

        return new Response($returnData, $returnData['status']);
    }

    /**
     * Display active advertisements.
     *
     * @return \Illuminate\Http\Response
     */
    public function getActives()
    {
        $activeAdvertisements = Advertisement::where('state', 1)->get();
        $count = $activeAdvertisements->count();

        if ($count > 0) {
            $returnData = [
                'status' => 200,
                'msg' => 'Active Advertisements Retrieved',
                'count' => $count,
                'objeto' => $activeAdvertisements
            ];
        } else {
            $returnData = [
                'status' => 404,
                'msg' => 'No Active Advertisements Found'
            ];
        }

        return new Response($returnData, $returnData['status']);
    }

    /**
     * Store a newly created advertisement in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // Validación de los datos recibidos
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string|max:1000',
                'slug' => 'nullable|string|max:255|unique:advertisements,slug',
                'url' => 'nullable|string',
                'pictureBase64' => 'required|string', // Base64 string
                'type' => 'nullable|integer|in:1,2,3', // Ejemplo de tipos válidos
                'event_id' => 'nullable|exists:events,id',
                'user_id' => 'nullable|exists:users,id'
            ]);

            // Subida de la imagen a S3
            $s3Controller = new S3Controller();
            $path = $s3Controller->uploadImage($validated['pictureBase64'], 'advertisements');

            if (!$path) {
                $returnData = [
                    'status' => 500,
                    'msg' => 'Error uploading image',
                    'objeto' => null
                ];
                return new Response($returnData, $returnData['status']);
            }

            // Creación del anuncio
            $advertisement = Advertisement::create(array_merge(
                $validated,
                ['url' => $path, 'picture' => $path]
            ));

            // Respuesta exitosa
            $returnData = [
                'status' => 201,
                'msg' => 'Advertisement Created',
                'objeto' => $advertisement
            ];

            return new Response($returnData, $returnData['status']);
        } catch (\Exception $e) {
            $returnData = [
                'status' => 500,
                'msg' => $e->getMessage(),
                'objeto' => $advertisement
            ];
            return new Response($returnData, $returnData['status']);
        }
    }

    /**
     * Remove the specified advertisement from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $advertisement = Advertisement::find($id);

        if (!$advertisement) {
            return new Response(['status' => 404, 'msg' => 'Advertisement Not Found'], 404);
        }

        $s3Controller = new S3Controller();
        $s3Controller->deleteImage($advertisement->picture);
        $advertisement->delete();

        return new Response(['status' => 200, 'msg' => 'Advertisement Deleted'], 200);
    }

    /**
     * Update a discount associated with an advertisement.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateDiscount(Request $request, $id)
    {
        $discount = AdvertisementsDiscount::find($id);

        if (!$discount) {
            return new Response(['status' => 404, 'msg' => 'Discount Not Found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'type' => 'nullable|integer',
            'state' => 'nullable|integer'
        ]);

        $discount->update($validated);

        $returnData = [
            'status' => 200,
            'msg' => 'Discount Updated',
            'objeto' => $discount
        ];

        return new Response($returnData, $returnData['status']);
    }
}

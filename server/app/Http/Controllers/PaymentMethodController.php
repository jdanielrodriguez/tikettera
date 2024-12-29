<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\PaymentMethod;
use App\Models\PaymentType;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of payment methods for a specific user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'payment_type_id' => 'required|exists:payment_types,id',
        ]);

        $paymentMethods = PaymentMethod::where('user_id', $validated['user_id'])->where('payment_type_id', $validated['payment_type_id'])->get();
        $count = $paymentMethods->count();

        $returnData = [
            'status' => 200,
            'msg' => 'Payment Methods Retrieved',
            'count' => $count,
            'objeto' => $paymentMethods,
        ];

        return new Response($returnData, $returnData['status']);
    }

    /**
     * Store a newly created payment method in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'card_number' => 'required|string',
                'card_name' => 'required|string',
                'bank_name' => 'sometimes|string',
                'expiration_date' => 'required|string',
                'cvv' => 'required|string',
                'payment_type_id' => 'nullable|exists:payment_types,id',
                'is_default' => 'nullable|boolean',
            ]);

            // Asignar el tipo de pago predeterminado si no se proporciona
            $validated['payment_type_id'] = $validated['payment_type_id'] ?? PaymentType::where('type', 'credit_card')->first()->id;

            if ($validated['is_default']) {
                // Clear previous default methods for the user
                PaymentMethod::where('user_id', $validated['user_id'])->update(['is_default' => false]);
            }

            $paymentMethod = PaymentMethod::create($validated);

            $returnData = [
                'status' => 201,
                'msg' => 'Payment Method Created',
                'objeto' => $paymentMethod,
            ];

            return response()->json($returnData, 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'msg' => 'An error occurred while creating the payment method',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update a payment method to be the default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function setDefault(Request $request, $id)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $paymentMethod = PaymentMethod::where('id', $id)->where('user_id', $validated['user_id'])->first();

        if (!$paymentMethod) {
            return new Response(['status' => 404, 'msg' => 'Payment Method Not Found'], 404);
        }

        // Clear previous default methods for the user
        PaymentMethod::where('user_id', $validated['user_id'])->update(['is_default' => false]);

        $paymentMethod->update(['is_default' => true]);

        $returnData = [
            'status' => 200,
            'msg' => 'Payment Method Set as Default',
            'objeto' => $paymentMethod,
        ];

        return new Response($returnData, $returnData['status']);
    }

    /**
     * Remove the specified payment method from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $paymentMethod = PaymentMethod::where('id', $id)->where('user_id', $validated['user_id'])->first();

        if (!$paymentMethod) {
            return new Response(['status' => 404, 'msg' => 'Payment Method Not Found'], 404);
        }

        $paymentMethod->delete();

        return new Response(['status' => 200, 'msg' => 'Payment Method Deleted'], 200);
    }
}

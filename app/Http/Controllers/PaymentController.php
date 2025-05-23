<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contracts\PaymentGateway;

class PaymentController extends Controller
{
    protected $gateway;

    public function __construct(PaymentGateway $gateway)
    {
        $this->gateway = $gateway;
    }

   public function pay(Request $request)
{
    $amount = $request->input('amount');

    if (!$amount) {
        return response()->json(['error' => 'Amount is required'], 400);
    }

    $message = $this->gateway->charge($amount);
    return response()->json(['message' => $message]);
}

}

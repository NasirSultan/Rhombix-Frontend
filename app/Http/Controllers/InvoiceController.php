<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Invoice;

class InvoiceController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'amount' => 'required|numeric'
        ]);

        $invoice = Invoice::generate($request->name, $request->amount);

        return response()->json($invoice);
    }
}

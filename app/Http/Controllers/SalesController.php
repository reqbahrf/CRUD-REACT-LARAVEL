<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $sales = Sale::get();
        if ($sales->isEmpty()) {
            return response()->json(['message' => 'No sales found'], 404);
        } else {
            return response()->json($sales, 200);
        }
    }
}

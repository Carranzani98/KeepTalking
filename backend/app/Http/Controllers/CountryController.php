<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index(Request $request)
    {
      $countries = Country::all();

      return response()->json(["data" => $countries]);
    }
}

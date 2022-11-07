<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function index(Request $request)
    {
      $languages = Language::all();

      return response()->json(["data" => $languages]);
    }
}

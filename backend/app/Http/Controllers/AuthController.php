<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validatedData = $request->validate( [
            'email' => 'required|string|email|max:100',
            'password' => 'required|string|min:6',
        ]);

        $token = Auth::attempt($validatedData);

        if(!$token){
            return response()->json(['Bad credentials'], 401);
        }

        return response()->json([
            'accessToken' => $token,
            'tokenType' => "bearer",
            'expiresIn' => 3600,
            'user' => Auth::user() 
        ]);
    }
}

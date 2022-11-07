<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  public function store(Request $request) 
  {
    //Pasar lang code
    $validatedData = $request->validate( [
        'name' => 'required|string|between:2,100',
        'surname' => 'required|string|between:2,100',
        'country' => 'required|string',
        'birthday' => 'required|date|date_format:m/d/Y',
        'email' => 'required|string|email|max:100|unique:users',
        'password' => 'required|string|min:6',
        'description' => 'required|string',
        'languageCodes' => 'required|array|max:4',
        'toLearnLanguageCodes' => 'required|array|max:4'
    ]);

    $name = $request->get('name');
    $surname = $request->get('surname');
    $email = $request->get('email');
    $password = $request->get('password');
    $country = $request->get('country');
    $birthday = $request->get('birthday');
    $description = $request->get('description');

    $user = new User();
    $user->name = $name;
    $user->surname = $surname;
    $user->email = $email;
    $user->password = Hash::make($password);
    $user->country = $country;
    $user->birthday = $birthday;
    $user->description = $description;

    $user->save();

    $user->languages()->attach($request->get('languageCodes'));
    $user->languagesToLearn()->attach($request->get('toLearnLanguageCodes'));

    return response()->json(['Registration successfully completed']);
  }
}
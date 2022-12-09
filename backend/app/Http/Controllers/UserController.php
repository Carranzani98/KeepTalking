<?php
namespace App\Http\Controllers;

use App\Models\LanguageToLearnUser;
use App\Models\LanguageUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
  public function __construct()
  {
      $this->middleware('auth:api', ['except' => ['store']]);
  }
  
  public function store(Request $request) 
  {

    $validatedData = $request->validate( [
        'name' => 'required|string|between:2,100',
        'surname' => 'required|string|between:2,100',
        'country' => 'required|string',
        'birthday' => 'required|date|date_format:m/d/Y',
        'email' => 'required|string|email|max:100|unique:users',
        'password' => 'required|string|min:6',
        'description' => 'required|string',
        'languagesToTeach' => 'required|array|max:4',
        'languagesToLearn' => 'required|array|max:4'
    ]);

    $user = new User();
    $user->name = $request->get('name');
    $user->surname = $request->get('surname');
    $user->email = $request->get('email');
    $user->password = Hash::make($request->get('password'));
    $user->country = $request->get('country');
    $user->birthday = $request->get('birthday');
    $user->description = $request->get('description');
    
    $user->save();

    $user->languages()->attach($request->get('languagesToTeach'));
    $user->languagesToLearn()->attach($request->get('languagesToLearn'));

    

    return response()->json(['meta' => ['result' =>'OK']]);
  }
  
  public function index(Request $request)
  {
    $user = User::find(Auth::id());
    $user->languagesToTeach;
    $user->languagesToLearn;
    return response()->json(["data" => $user]);
  }

  public function update(Request $request)
  {
    $validatedData = $request->validate( [
      'name' => 'required|string|between:2,100',
      'surname' => 'required|string|between:2,100',
      'country' => 'required|string',
      'birthday' => 'required|date|date_format:m/d/Y',
      'description' => 'required|string',
      'languagesToTeach' => 'required|array|max:4',
      'languagesToLean' => 'required|array|max:4'
    ]);

    $user = User::find(Auth::id());
    if($request->get('password'))
    {
      $user->password->validate(['required|string|min:6']);
      $user->password = Hash::make($request->get('password'));
    }
    $user->name = $request->get('name');
    $user->surname = $request->get('surname');
    $user->country = $request->get('country');
    $user->birthday = $request->get('birthday');
    $user->description = $request->get('description');
    $user->languages()->sync($request->get('languagesToTeach'));
    $user->languagesToLearn()->sync($request->get('languagesToLean'));

    $user->save();

    return response()->json(['meta' => ['result' =>'OK']]);
  }

  // public function matchingUSers(Request $request)
  // {
  //   $user = Auth::user()
  //   $users = User::all()

  //   return response()->json(["data" => $users]);
  // }
}
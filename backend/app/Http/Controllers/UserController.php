<?php
namespace App\Http\Controllers;

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
        'languages_to_teach' => 'required|array|max:4',
        'languages_to_learn' => 'required|array|max:4'
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

    $user->languagesToTeach()->attach($request->get('languages_to_teach'));
    $user->languagesToLearn()->attach($request->get('languages_to_learn'));

    

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
      'languages_to_teach' => 'required|array|max:4',
      'languages_to_learn' => 'required|array|max:4'
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
    $user->languagesToTeach()->sync($request->get('languages_to_teach'));
    $user->languagesToLearn()->sync($request->get('languages_to_learn'));

    $user->save();

    return response()->json(['meta' => ['result' =>'OK']]);
  }

  public function matchingUsers(Request $request)
  {
    $matchingUsers = [];
    $authUser = User::find(Auth::id());
    $authUserlanguagesToTeachIds = collect($authUser->languagesToTeach)->pluck('id');
    $authUserlanguagesToLearnIds = collect($authUser->languagesToLearn)->pluck('id');

  

  foreach (User::all() as $user) {
    $languagesToTeachIds = collect($user->languagesToTeach)->pluck('id');
    $languagesToLearnIds = collect($user->languagesToLearn)->pluck('id');

    if(!empty(array_intersect($authUserlanguagesToTeachIds->all(), $languagesToLearnIds->all())) && !empty(array_intersect($authUserlanguagesToLearnIds->all(), $languagesToTeachIds->all()))){
      array_push($matchingUsers, $user);
    };
  }
    return response()->json(["data" => $matchingUsers]);
  }

}
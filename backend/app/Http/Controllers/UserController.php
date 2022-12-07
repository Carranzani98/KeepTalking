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
        'languageCodes' => 'required|array|max:4',
        'toLearnLanguageCodes' => 'required|array|max:4'
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

    $user->languages()->attach($request->get('languageCodes'));
    $user->languagesToLearn()->attach($request->get('toLearnLanguageCodes'));

    

    return response()->json(['meta' => ['result' =>'OK']]);
  }
  
  public function index(Request $request)
  {

    $user = Auth::user();
    $languagesArray = array();
    $languagesToLearn = array();
    foreach (LanguageUser::get()->where('user_id',Auth::id()) as $key => $value) {
        array_push($languagesArray,$value['language_code']);
    }
    
    foreach (LanguageToLearnUser::get()->where('user_id',Auth::id()) as $key => $value) {
      array_push($languagesToLearn,$value['language_code']);
    }

    $user->languageCodes = $languagesArray;
    $user->toLearnLanguageCodes = $languagesToLearn;
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
      'languageCodes' => 'required|array|max:4',
      'toLearnLanguageCodes' => 'required|array|max:4'
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
    $user->languages()->sync($request->get('languageCodes'));
    $user->languagesToLearn()->sync($request->get('toLearnLanguageCodes'));

    $user->save();

    return response()->json(['meta' => ['result' =>'OK']]);
  }
}
<?php

namespace App\Http\Controllers;

use App\Models\Meet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{
  public function __construct()
  {
      $this->middleware('auth:api');
  }

  public function index(Request $request)
  {

    $user = User::find(Auth::id());

    return response()->json(["data" => $user->meets]);
  }

  public function createMeet(Request $request){
    $creatorId = Auth::id();
    $otherUserId = $request->input('otherUserId');
    $startTime = $request->input('startTime');
    $endTime = $request->input('endTime');
    $title = $request->input('title');
    $notes = $request->input('notes');

    $newMeet = new Meet([
      'user1_id' => $creatorId,
      'user2_id' => $otherUserId,
      'startTime' => $startTime,
      'endTime' => $endTime,
      'title' => $title,
      'notes' => $notes,
    ]);

    $newMeet->save();

    return response()->json(['meta' => ['result' =>'OK']]);
  }

  public function deleteMeet(Request $request){
    $user = User::find(Auth::id());

    $user->meets()->where('id', $request->input('id'))->delete();
    return response()->json(['meta' => ['result' =>'OK']]);

  }
}

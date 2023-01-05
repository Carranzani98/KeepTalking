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

    return response()->json($newMeet);
  }

  public function updateMeet(Request $request){
    $meet = Meet::find($request->input('id'));
    $meet->title = $request->input('title');
    $meet->notes = $request->input('notes');
    $meet->startTime = $request->input('startTime');
    $meet->endTime = $request->input('endTime');
    $meet->save();

    return response()->json(['meta' => ['result' =>'OK']]);
  }

  public function deleteMeet(Request $request){
    Meet::find($request->input('meetId'))->delete();
    return response()->json(['meta' => ['result' =>'OK']]);
  }
}

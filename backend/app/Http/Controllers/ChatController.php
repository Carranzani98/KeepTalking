<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use App\Models\Chat;
use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $user = User::find(Auth::id());

        $users = [];

        foreach ($user->chats as $chat) {
            array_push($users, User::find($chat->receiver_id));
        };

        return response()->json(['data' => $users]);
    }

    public function deleteAllChats (Request $request)
    {
        $user = User::find(Auth::id());

        $user->chats()->delete();

        return response()->json(['meta' => ['result' =>'OK']]);
    }

    public function deleteChat(Request $request)
    {
        $user = User::find(Auth::id());

        $user->chats()->where('receiver_id', $request->input('receiverId'))->delete();

        return response()->json(['meta' => ['result' =>'OK']]);
    }

    public function fetchMessages(Request $request)
    {        
        return response()->json(['data' => ['messages' => Message::where(function ($query) use ($request) {
            $query->where('user_id', Auth::id())
                ->where('receiver_id', $request->input('receiverId'));
        })->orWhere(function ($query) use ($request) {
            $query->where('user_id', $request->input('receiverId'))
                ->where('receiver_id', Auth::id());
        })->with('user')->get(), 'receiver' => User::find($request->input('receiverId'))]]);
        
    }

    public function sendMessage(Request $request)
    {
        $sender = User::find(Auth::id());
        $receiver = User::find($request->input('receiverId'),'id');
        if(count($sender->chats->where('receiver_id', $receiver->id)) == 0)
        {
            $newChat = new Chat(['userId' => $sender->id, 'receiver_id' => $receiver->id]);
            $sender->chats()->save($newChat);
        }

        if(count($receiver->chats->where('receiver_id', $sender->id)) == 0)
        {
            $newChat = new Chat(['userId' => $receiver->id, 'receiver_id' => $sender->id]);
            $receiver->chats()->save($newChat);
        }

        $newMessage = new Message(['message' => $request->input('message'), 'user_id' => $sender->id, 'receiver_id' => $receiver->id]);
        $message = $sender->messages()->save($newMessage);
        broadcast(new MessageEvent($sender, $receiver , $message))->toOthers();
    
        return response()->json(['meta' => ['result' =>'OK']]);
    }

}

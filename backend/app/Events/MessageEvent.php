<?php

namespace App\Events;

use App\Models\Message;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public User $sender,
        public User $receiver,
        public Message $message
    )
    {
     
    }

    public function broadcastOn()
    {
        $chatId = $this->sender->id < $this->receiver->id ? $this->sender->id . '-' . $this->receiver->id : $this->receiver->id . '-' . $this->sender->id;
        return ['chat' . $chatId];
    }

    public function broadcastAs()
    {
        return 'message';
    }
}

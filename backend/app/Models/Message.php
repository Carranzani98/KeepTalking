<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['id','message', 'sender_id', 'receiver_id'];

    public function user () 
    {
        return $this->belongsTo(User::class);
    }
}

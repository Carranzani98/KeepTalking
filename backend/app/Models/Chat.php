<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable = ['id','user_id', 'receiver_id'];

    public function user () 
    {
        return $this->belongsTo(User::class);
    }
}

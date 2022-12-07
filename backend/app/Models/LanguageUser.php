<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class LanguageUser extends Model
{

    protected $fillable = [
        'user_id',
        'language_code',
    ];

}

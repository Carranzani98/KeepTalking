<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class LanguageToLearnUser extends Model
{

    protected $fillable = [
        'user_id',
        'language_code',
    ];

}

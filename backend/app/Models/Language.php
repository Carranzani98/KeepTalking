<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    public function usersKnows()
    {
        return $this->belongsToMany(User::class, 'language_users', 'user_id', 'language_id');
    }

    public function usersWantsToLearn()
    {
        return $this->belongsToMany(User::class, 'language_to_learn_users', 'user_id', 'language_id');
    }
}

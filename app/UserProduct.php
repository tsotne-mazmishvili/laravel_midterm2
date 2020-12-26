<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserProduct extends Model
{
    protected $fillable = [
        'user_id', 'product_id'
    ];

}

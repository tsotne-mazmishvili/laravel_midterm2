<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class products extends Model
{
    protected $fillable = [
        'name', 'description', 'price', 'image'
    ];

    public function brand(){
        return $this->belongsTo('App\brands');
    }

     public function users()
    {
        return $this->belongsToMany('App\User');
    }
}

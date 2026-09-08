<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assists extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'date',
    ];

    public function Customer()
    {
        return $this->belongsTo(Customers::class, 'customer_id');
    }
}

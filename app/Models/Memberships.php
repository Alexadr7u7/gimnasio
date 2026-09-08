<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Memberships extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'price',
        'duration',
    ];

    public function Customer_Memberships()
    {
        return $this->hasMany(Customer_Memberships::class, 'membership_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'amount',
        'date_payment',
    ];

    public function Customer_Memberships()
    {
        return $this->belongsTo(Customer_Memberships::class, 'customer_membership_id');
    }
}

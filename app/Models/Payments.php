<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'amount',
        'created_at',
        'payment_method',
        'customer_membership_id',
    ];

    protected $casts = [
        'created_at' => 'date:Y-m-d',
    ];

    public function customerMembership()
    {
        return $this->belongsTo(Customer_memberships::class, 'customer_membership_id');
    }
}

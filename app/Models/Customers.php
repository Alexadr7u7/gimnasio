<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customers extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'email',
        'phone',
    ];

    public function memberships()
    {
        return $this->hasMany(Customer_memberships::class, 'customer_id');
    }

    /**
     * La membresía más reciente del cliente (la que nos interesa mostrar en la tabla).
     */
    public function latestMembership()
    {
        return $this->hasOne(Customer_memberships::class, 'customer_id')->latestOfMany('start_date');
    }
    public function scopeSearch($query, $search)
    {
        if (!$search) {
            return $query;
        }

        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        });
    }
}

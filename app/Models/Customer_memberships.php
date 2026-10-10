<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Carbon\Carbon;

class Customer_memberships extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'customer_id',
        'membership_id',
        'end_date',
        'start_date',
        'status',
    ];
    protected $appends = ['computed_status'];
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function customer()
    {
        return $this->belongsTo(Customers::class, 'customer_id');
    }

    public function membership()
    {
        return $this->belongsTo(Memberships::class, 'membership_id');
    }
    public function payments()
    {
        return $this->hasMany(Payments::class, 'customer_membership_id');
    }
    /**
     * Estado calculado en tiempo real, sin depender de que
     * el campo 'status' de la BD esté actualizado.
     */
    protected function computedStatus(): Attribute
    {
        return Attribute::make(
            get: function () {
                if ($this->status === 'inactive') {
                    return 'inactive';
                }

                $daysUntilExpiry = Carbon::now()->diffInDays($this->end_date, false);

                if ($daysUntilExpiry < 0) {
                    return 'expired';
                }

                if ($daysUntilExpiry <= 7) {
                    return 'expiring_soon';
                }

                return 'active';
            }
        );
    }
}

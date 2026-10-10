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

    /**
     * Filtra por plan (membership_id de la membresía más reciente).
     */
    public function scopePlan($query, $plan)
    {
        if (!$plan) {
            return $query;
        }

        return $query->whereHas('latestMembership', fn($m) => $m->where('membership_id', $plan));
    }

    /**
     * Filtra por estado según la fecha de vencimiento de la membresía más reciente.
     */
    public function scopeStatus($query, $status)
    {
        if (!$status) {
            return $query;
        }

        $today = now()->toDateString();

        return $query->whereHas('latestMembership', function ($m) use ($status, $today) {
            match ($status) {
                'active'   => $m->whereDate('end_date', '>=', $today),
                'expiring' => $m->whereBetween('end_date', [$today, now()->addDays(7)->toDateString()]),
                'expired'  => $m->whereDate('end_date', '<', $today),
                default    => null,
            };
        });
    }

    /**
     * Ordena por una columna permitida (o por vencimiento de la última membresía).
     */
    public function scopeSortBy($query, $sortBy, $direction = 'desc')
    {
        $direction = strtolower($direction) === 'asc' ? 'asc' : 'desc';

        if ($sortBy === 'expiration') {
            return $query->orderBy(
                Customer_memberships::select('end_date')
                    ->whereColumn('customer_id', 'customers.id')
                    ->latest('start_date')
                    ->limit(1),
                $direction
            );
        }
        $allowed = ['id', 'created_at', 'name', 'email', 'phone'];

        return $query->orderBy(in_array($sortBy, $allowed) ? $sortBy : 'created_at', $direction);
    }
}

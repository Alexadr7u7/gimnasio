<?php

namespace App\Http\Controllers;

use App\Models\Customers;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Memberships;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CustomersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->perPage ?? 10;
        $sortBy = $request->sortBy ?? 'created_at';
        $sortDirection = $request->sortDirection ?? 'desc';

        return Inertia::render('customers/index', [
            'customers' => Customers::search($request->search)
                ->plan($request->plan)
                ->status($request->status)
                ->sortBy($sortBy, $sortDirection)
                ->with('latestMembership.membership')
                ->paginate($perPage)
                ->withQueryString(),
            'stats' => [
                'all' => Customers::count(),
                'active' => Customers::status('active')->count(),
                'expiring' => Customers::status('expiring')->count(),
                'expired' => Customers::status('expired')->count(),
                'new_this_month' => Customers::where('created_at', '>=', now()->startOfMonth())->count(),
            ],
            'memberships' => Memberships::select('id', 'name')->orderBy('name')->get(),
            'filters' => [
                'search' => $request->search,
                'perPage' => $perPage,
                'sortBy' => $sortBy,
                'sortDirection' => $sortDirection,
                'plan' => $request->plan,
                'status' => $request->status,
            ],
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */

    public function create()
    {
        return inertia('customers/create', [
            'memberships' => Memberships::select('id', 'name', 'price', 'duration')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function store(StoreCustomerRequest $request)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data) {
            $customer = Customers::create([
                'name'  => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
            ]);

            $plan = Memberships::findOrFail($data['membership_id']);
            $start = Carbon::parse($data['start_date']);

            $end = match ($plan->duration) {
                'weekly'  => $start->copy()->addWeek(),
                'monthly' => $start->copy()->addMonth(),
                'year'  => $start->copy()->addYear(),
            };

            $membership = $customer->memberships()->create([
                'membership_id' => $plan->id,
                'start_date'    => $start,
                'end_date'      => $end,
                'status'        => 'active',
            ]);

            $membership->payments()->create([
                'amount'         => $plan->price,
                'payment_method' => $data['payment_method'],
            ]);
        });

        return redirect()->route('customers.index')->with('success', 'Cliente creado exitosamente.');
    }
    /**
     * Display the specified resource.
     */
    public function show(Customers $customers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customers $customer)
    {
        return inertia('customers/edit', [
            'customers' => $customer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customers $customer)
    {
        $validated = $request->validated();

        $customer->update($validated);
        return redirect()->route('customers.index')->with('success', 'Cliente actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customers $customer)
    {
        $customer->delete();
        return redirect()->route('customers.index')->with('success', 'Cliente eliminado exitosamente.');
    }
}

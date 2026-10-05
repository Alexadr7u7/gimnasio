<?php

namespace App\Http\Controllers;

use App\Models\Customers;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Memberships;

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
            'customers' => new Customers()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $validated = $request->validated();

        Customers::create($validated);
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

<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CustomersController;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('customers', [CustomersController::class, 'index'])->name('customers.index');
Route::get('customers/create', [CustomersController::class, 'create'])->name('customers.create');
Route::post('customers', [CustomersController::class, 'store'])->name('customers.store');
Route::get('customers/{customer}/edit', [CustomersController::class, 'edit'])->name('customers.edit');
Route::put('customers/{customer}', [CustomersController::class, 'update'])->name('customers.update');
Route::delete('customers/{customer}', [CustomersController::class, 'destroy'])->name('customers.destroy');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

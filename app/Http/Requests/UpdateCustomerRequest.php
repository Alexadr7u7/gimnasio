<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'           => ['required', 'string', 'max:255'],
            'email'          => ['required', 'email', Rule::unique('customers', 'email')->ignore($this->route('customer'))],
            'phone'          => ['required', 'string', 'max:20'],
            'membership_id'  => ['required', 'exists:memberships,id'],
            'start_date'     => ['required', 'date'],
            'payment_method' => ['required', 'in:card,transfer,cash'],
        ];
    }
}

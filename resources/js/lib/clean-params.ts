// resources/js/lib/clean-params.ts
import type { FormDataConvertible } from '@inertiajs/core';

export function cleanParams(params: Record<string, unknown>): Record<string, FormDataConvertible> {
    return Object.fromEntries(
        Object.entries(params).filter(([key, value]) => {
            if (value === '' || value === null || value === undefined) return false;
            if (key === 'perPage' && Number(value) === 10) return false;
            if (key === 'sortBy' && value === 'created_at') return false;
            if (key === 'sortDirection' && value === 'desc') return false;
            if (key === 'page' && Number(value) === 1) return false;
            return true;
        }),
    ) as Record<string, FormDataConvertible>;
}

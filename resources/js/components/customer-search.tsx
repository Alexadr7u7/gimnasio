import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filters } from '@/types';
import { router } from '@inertiajs/react';
import React from 'react';

type CustomerSearchProps = {
    search: string;
    setSearch: (value: string) => void;
    filters: Filters;
};

export default function CustomerSearch({ search, setSearch, filters }: CustomerSearchProps) {
    const [timeoutId, setTimeoutId] = React.useState<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const customerInput = e.target.value;
        setSearch(customerInput);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            router.get(
                route('customers.index'),
                { ...filters, search: customerInput },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }, 300);
        setTimeoutId(newTimeoutId);
    };
    const handleReset = () => {
        setSearch('');
        router.get(
            route('customers.index'),
            { ...filters, search: '' },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <div className="felx-1">
                <Label>Buscar clientes</Label>
                <Input type="text" name="search" placeholder="Buscar clientes..." onChange={handleChange} value={search} />
            </div>
            <Button variant="destructive" className="cursos-pointer self-end" onClick={handleReset}>
                x
            </Button>
        </div>
    );
}

import { cleanParams } from '@/lib/clean-params';
import { Filters, Stats } from '@/types';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
type CustomerSearchProps = {
    search: string;
    setSearch: (value: string) => void;
    filters: Filters;
    memberships: { id: number; name: string }[];
    stats: Stats;
};

const STATUS_OPTIONS = [
    { key: '', label: 'Todos', count: 'all', dot: null },
    { key: 'active', label: 'Activos', count: 'active', dot: 'bg-tertiary animate-pulse' },
    { key: 'expiring', label: 'Por Vencer', count: 'expiring', dot: 'bg-tertiary' },
    { key: 'expired', label: 'Vencidos', count: 'expired', dot: 'bg-primary' },
] as const;

const SORT_OPTIONS = [
    { label: 'Recientes', sortBy: 'created_at', sortDirection: 'desc' },
    { label: 'Vencimiento', sortBy: 'expiration', sortDirection: 'asc' },
    { label: 'Nombre A-Z', sortBy: 'name', sortDirection: 'asc' },
];

export default function CustomerSearch({ search, setSearch, filters, memberships, stats }: CustomerSearchProps) {
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Mezcla los filtros actuales con el cambio nuevo
    const applyFilters = (params: Partial<Filters>) => {
        router.get(route('customers.index'), cleanParams({ ...filters, ...params }), {
            preserveState: true,
            preserveScroll: true,
        });
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => applyFilters({ search: value }), 300);
    };

    const currentStatus = filters.status ?? '';
    const currentSortBy = filters.sortBy ?? 'created_at';

    return (
        <div className="p-space-md mb-space-md gap-space-md flex flex-col rounded-xl shadow-md backdrop-blur-xl">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
                <div className="relative md:col-span-6">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                        <Search className="h-4 w-4" />
                    </div>
                    <Input type="text" name="search" placeholder="Buscar clientes..." onChange={handleChange} value={search} className="pl-10" />
                </div>

                <div className="md:col-span-3">
                    <select
                        value={filters.plan ?? ''}
                        onChange={(e) => applyFilters({ plan: e.target.value })}
                        className="bg-background focus:bg-surface-container-high h-11 w-full rounded-lg px-2 text-sm focus:outline-none"
                    >
                        <option value="">Todos los Planes</option>
                        {memberships.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between pt-5">
                <div className="flex items-center gap-3">
                    <span className="text-outline text-tertiary text-sm tracking-wider uppercase">Estado:</span>
                    <div className="flex items-center gap-1 p-1">
                        {STATUS_OPTIONS.map((s) => (
                            <Button
                                key={s.key}
                                variant={currentStatus === s.key ? 'active' : 'outline'}
                                onClick={() => applyFilters({ status: s.key })}
                            >
                                {s.dot && <span className={`h-2 w-2 rounded-full ${s.dot}`}></span>}
                                {s.label} ({(stats?.[s.count] ?? 0).toLocaleString()})
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-outline text-tertiary text-sm tracking-wider uppercase">Ordenar:</span>
                    <div className="flex items-center gap-1 p-1">
                        {SORT_OPTIONS.map((o) => (
                            <Button
                                key={o.sortBy}
                                variant={currentSortBy === o.sortBy ? 'active' : 'outline'}
                                className="px-space-xs"
                                onClick={() => applyFilters({ sortBy: o.sortBy, sortDirection: o.sortDirection as 'asc' | 'desc' })}
                            >
                                {o.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { cleanParams } from '@/lib/clean-params';
import { Filters } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';

type SortLinkProps = {
    filters: Filters;
    field: string;
    label: string;
};

export default function SortLink({ filters, field, label }: SortLinkProps) {
    const isActive = filters.sortBy === field;
    const isDesc = filters.sortDirection === 'desc';

    // Si no es la columna activa o está en ASC → pasa a DESC; si está en DESC → pasa a ASC
    const nextDirection = isActive && isDesc ? 'asc' : 'desc';

    const Icon = !isActive ? ArrowDownUp : isDesc ? ArrowDownWideNarrow : ArrowUpNarrowWide;

    return (
        <Link
            className="flex items-center space-x-2"
            href={route('customers.index')}
            data={cleanParams({ ...filters, sortBy: field, sortDirection: nextDirection })}
            preserveState
            preserveScroll
        >
            <span>{label}</span>
            <Icon size={18} />
        </Link>
    );
}
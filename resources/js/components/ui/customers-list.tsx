import MembershipStatusBadge from '@/components/ui/membership-status-badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SortLink from '@/components/ui/soft-link';
import { Customer, Filters } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { Edit, Eye, MoreVertical, RefreshCw } from 'lucide-react';

type CustomerListProps = {
    customers: Customer[];
    filters: Filters;
};

export default function CustomerList({ customers, filters }: CustomerListProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const daysUntil = (dateString: string) => {
        const target = new Date(dateString);
        const today = new Date();
        const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (diff > 0) return `En ${diff} días`;
        if (diff < 0) return `Hace ${Math.abs(diff)} días`;
        return 'Hoy';
    };

    const initials = (name: string) =>
        name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

    const { processing, delete: destroy } = useForm();
    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este cliente?')) {
            destroy(route('customers.destroy', id));
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow className="h-11 uppercase tracking-wider">
                    <TableHead className="px-4">
                        <SortLink filters={filters} field="name" label="Cliente" />
                    </TableHead>
                    <TableHead className="px-4">
                        <SortLink filters={filters} field="phone" label="Teléfono" />
                    </TableHead>
                    <TableHead className="px-4">Plan</TableHead>
                    <TableHead className="px-4">Estado</TableHead>
                 
                    <TableHead className="px-4">Vencimiento</TableHead>
                    {/* <TableHead className="px-4">Asistencias / Accesos</TableHead> */}

                    <TableHead className="px-4 text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border">
                {customers.map((customer) => {
                    const membership = customer.latest_membership;

                    return (
                        <TableRow key={customer.id} className="group transition-colors hover:bg-accent/40">
                            {/* Cliente */}
                            <TableCell className="px-4 py-3.5">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-bold text-tertiary">
                                            {initials(customer.name)}
                                        </div>
                                        {membership?.computed_status === 'active' && (
                                            <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
                                        )}
                                    </div>
                                    <div className="flex min-w-0 flex-col">
                                        <span className="truncate font-semibold text-foreground transition-colors group-hover:text-tertiary">
                                            {customer.name}
                                        </span>
                                        <span className="mt-0.5 truncate text-xs text-muted-foreground">{customer.email}</span>
                                    </div>
                                </div>
                            </TableCell>

                            {/* Teléfono */}
                            <TableCell className="px-4 py-3.5">
                                <span className="text-sm text-foreground">{customer.phone}</span>
                            </TableCell>

                            {/* Plan */}
                            <TableCell className="px-4 py-3.5">
                                {membership ? (
                                    <div className="flex flex-col">
                                        <span className="w-fit rounded bg-accent px-2 py-0.5 text-sm font-semibold text-foreground">
                                            {membership.membership.name}
                                        </span>
                                        <span className="mt-1 text-xs text-muted-foreground">${membership.membership.price} / mes</span>
                                    </div>
                                ) : (
                                    <span className="text-xs text-muted-foreground">Sin membresía</span>
                                )}
                            </TableCell>

                            {/* Estatus */}
                            <TableCell className="px-4 py-3.5">
                                {membership ? <MembershipStatusBadge status={membership.computed_status} /> : <span className="text-xs text-muted-foreground">—</span>}
                            </TableCell>

                   

                            {/* Vencimiento */}
                            <TableCell className="px-4 py-3.5">
                                {membership ? (
                                    <div className="flex flex-col">
                                        <span className="font-mono text-sm text-foreground">{formatDate(membership.end_date)}</span>
                                        <span className="text-xs text-muted-foreground">{daysUntil(membership.end_date)}</span>
                                    </div>
                                ) : (
                                    <span className="text-xs text-muted-foreground">—</span>
                                )}
                            </TableCell>

                            {/* Acciones */}
                            <TableCell className="px-4 py-3.5 text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" title="Ver Ficha">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <Link href={route('customers.edit', customer.id)}>
                                        <button
                                            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                            title="Editar Cliente"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    </Link>
                                    <button className="rounded-lg p-2 text-secondary transition-colors hover:bg-accent hover:text-primary" title="Renovar">
                                        <RefreshCw className="h-4 w-4" />
                                    </button>
                                    <button
                                        disabled={processing}
                                        onClick={() => handleDelete(customer.id)}
                                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                        title="Eliminar"
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
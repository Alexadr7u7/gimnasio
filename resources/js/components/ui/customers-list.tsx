import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Customer, Filters } from '@/types';
import SortLink from '@/components/ui/soft-link';
import { Badge } from '@/components/ui/badge';
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

    const { ziggy } = usePage().props as any;
    const { processing, delete: destroy } = useForm();
    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este curso?')) {
            destroy(route('cursos.destroy', id));
        }
    };
    return (

                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">  
                                    <SortLink
                            filters={filters}
                            field="id"
                            label="ID"
                        /></TableHead>
                                <TableHead>
                                    <SortLink
                                        filters={filters}
                                        field="name"
                                        label="Nombre"
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortLink
                                        filters={filters}
                                        field="email"
                                        label="Email"
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortLink
                                        filters={filters}
                                        field="phone"
                                        label="Telefono"
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortLink
                                        filters={filters}
                                        field="status"
                                        label="Estado"
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortLink
                                        filters={filters}
                                        field="created_at"
                                        label="Creado"
                                    />
                                </TableHead>
                                <TableHead>Actualizado</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell className="font-medium">{customer.id}</TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>
                                        {customer.status === 'active' ? (
                                            <Badge variant="default">Activo</Badge>
                                        ) : (
                                            <Badge variant="destructive">Inactivo</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{customer.created_at}</TableCell>
                                    <TableCell>{customer.updated_at}</TableCell>
                                    <TableCell className="space-x-2 text-right">
                                        <Link href={route('customers.edit', customer.id)}>
                                            <Button variant="default" size="sm">
                                                Editar
                                            </Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" disabled={processing} onClick={() => handleDelete(customer.id)}>
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
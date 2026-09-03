import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/customers',
    },
];
interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    created_at: string;
    updated_at: string;
}
export default function Index({ customers }: { customers: Customer[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="m-2">
                <Link href={route('customers.create')}>
                    <Button className="mb-4">Crear Cliente</Button>
                </Link>
                {customers.length > 0 && (
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">id</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Telefono</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Creado</TableHead>
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
                                    <TableCell>{customer.status}</TableCell>
                                    <TableCell>{customer.created_at}</TableCell>
                                    <TableCell>{customer.updated_at}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('customers.edit', customer.id)}>
                                            <Button variant="default" size="sm">
                                                Editar
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </AppLayout>
    );
}

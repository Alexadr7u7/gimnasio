import CustomerSearch from '@/components/customer-search';
import Pagination from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Customer, Filters, PageLinkItem, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/customers',
    },
];

type CustomersPagination = {
    data: Customer[];
    links: PageLinkItem[];
};

type IndexProps = {
    customers: CustomersPagination;
    filters: Filters;
};
export default function Index({ customers, filters }: IndexProps) {
    const { data, setData } = useForm({
        search: filters.search || '',
        perPage: filters.perPage,
        sertBy: filters.sortBy,
        sortDirection: filters.sortDirection,
    });
    const { processing, delete: destroy } = useForm();
    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este cliente?')) {
            destroy(route('customers.destroy', id));
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="m-2">
                <Link href={route('customers.create')}>
                    <Button className="mb-4">Crear Cliente</Button>
                </Link>
                <CustomerSearch filters={filters} search={data.search} setSearch={(value: string) => setData('search', value)} />
                {customers.data.length > 0 && (
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
                            {customers.data.map((customer) => (
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
                <Pagination
                    links={customers.links}
                    filters={filters}
                    currentPage={data.perPage}
                    setCurrentPage={(value: number) => setData('perPage', value)}
                />
            </div>
        </AppLayout>
    );
}

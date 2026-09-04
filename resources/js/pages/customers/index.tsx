import CustomerSearch from '@/components/customer-search';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import CustomersList from '@/components/ui/customers-list';
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
                <CustomersList customers={customers.data} filters={filters} />

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

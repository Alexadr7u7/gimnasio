import CustomerSearch from '@/components/customer-search';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import CustomerList from '@/components/ui/customers-list';
import AppLayout from '@/layouts/app-layout';
import { Customer, Filters, PageLinkItem, Stats, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import CustomerStats from './components/customers-stats';

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
    memberships: { id: number; name: string }[];
    stats: Stats;
};

export default function Index({ customers, filters, memberships, stats }: IndexProps) {
    const { data, setData } = useForm({
        search: filters.search || '',
        perPage: filters.perPage,
        sortBy: filters.sortBy,
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
            <main className="bg-background w-full px-6 py-6">
                <div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
                    <div>
                        <h1 className="text-foreground text-3xl font-bold tracking-tight">Gestión de Clientes</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Administra altas, renovaciones y datos de contacto de tus clientes.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Link href={route('customers.create')} className="w-full">
                            <Button className="gap-2 shadow-[0_0_20px_rgba(185,28,28,0.35)]">
                                <UserPlus className="h-5 w-5" />
                                Registrar Nuevo Cliente
                            </Button>
                        </Link>
                    </div>
                </div>

                <CustomerStats stats={stats} />

                <div className="bg-card mb-4 flex flex-col gap-4 rounded-xl p-4 shadow-md">
                    <CustomerSearch
                        filters={filters}
                        search={data.search}
                        setSearch={(value: string) => setData('search', value)}
                        memberships={memberships}
                        stats={stats}
                    />
                </div>

                <div className="bg-card overflow-x-auto rounded-xl shadow-xl">
                    <CustomerList customers={customers.data} filters={filters} />
                </div>

                <div className="bg-card mt-4 rounded-xl p-3">
                    <Pagination
                        links={customers.links}
                        filters={filters}
                        currentPage={data.perPage}
                        setCurrentPage={(value: number) => setData('perPage', value)}
                    />
                </div>
            </main>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { Membership, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CustomerForm from './components/customer-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Clientes', href: '/customers' },
    { title: 'Crear Cliente', href: '/customers/create' },
];

export default function Create({ memberships }: { memberships: Membership[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Socio" />
            <CustomerForm memberships={memberships} />
        </AppLayout>
    );
}

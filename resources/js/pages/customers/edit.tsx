import AppLayout from '@/layouts/app-layout';
import { Customer, Membership, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CustomerForm from './components/customer-form';

export default function Edit({ customer, memberships }: { customer: Customer; memberships: Membership[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Clientes', href: route('customers.index') },
        { title: customer.name, href: route('customers.show', customer.id) },
        { title: 'Editar', href: route('customers.edit', customer.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${customer.name}`} />
            <CustomerForm customer={customer} memberships={memberships} />
        </AppLayout>
    );
}

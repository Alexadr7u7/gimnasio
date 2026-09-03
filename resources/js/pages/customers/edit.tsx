import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Editar Cliente',
        href: '/customers/edit',
    },
];

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export default function Edit({ customers }: { customers: Customer }) {
    const { data, setData, put, processing, errors } = useForm({
        name: customers.name,
        email: customers.email,
        phone: customers.phone,
    });
    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('customers.update', customers.id));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Cliente" />
            <div className="w-8/12 p-4">
                <h1 className="text-2xl font-bold">Editar Cliente</h1>
                <form method="post" className="space-y-4" onSubmit={handleUpdate}>
                    <div className="gap-1.5">
                        <Input placeholder="Nombre" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
                    <div className="gap-1.5">
                        <Input placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div className="gap-1.5">
                        <Input placeholder="Telefono" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                    </div>
                    <Button disabled={processing} type="submit">
                        Editar Cliente
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}

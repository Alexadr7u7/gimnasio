import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crear Cliente',
        href: '/customers/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('customers.store'), {
            forceFormData: true,
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Cliente" />
            <div className="w-8/12 p-4">
                <h1 className="text-2xl font-bold">Crear Cliente</h1>
                <form method="post" className="space-y-4" onSubmit={handleSubmit}>
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
                        Agregar Cliente
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}

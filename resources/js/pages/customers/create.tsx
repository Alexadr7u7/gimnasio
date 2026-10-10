import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Membership, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Crear Cliente', href: '/customers/create' }];

const PAYMENT_METHODS = [
    { key: 'cash', label: 'Efectivo' },
    { key: 'card', label: 'Tarjeta' },
    { key: 'transfer', label: 'Transferencia' },
];

export default function Create({ memberships }: { memberships: Membership[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        membership_id: '',
        payment_method: '',
        start_date: new Date().toISOString().split('T')[0],
    });

    const selected = memberships.find((m) => String(m.id) === data.membership_id);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('customers.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Cliente" />
            <div className="w-full max-w-2xl p-4">
                <h1 className="mb-4 text-2xl font-bold">Registrar Cliente</h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Datos del cliente */}
                    <section className="space-y-3">
                        <h2 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Datos del cliente</h2>
                        <div>
                            <Input placeholder="Nombre" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                            <Input placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>
                        <div>
                            <Input placeholder="Teléfono" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                        </div>
                    </section>

                    {/* Plan */}
                    <section className="space-y-3">
                        <h2 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Plan</h2>
                        <select
                            value={data.membership_id}
                            onChange={(e) => setData('membership_id', e.target.value)}
                            className="bg-background border-input h-9 w-full rounded-md border px-2 text-sm"
                        >
                            <option value="">Selecciona un plan</option>
                            {memberships.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name} — ${m.price}
                                </option>
                            ))}
                        </select>
                        {errors.membership_id && <p className="text-sm text-red-500">{errors.membership_id}</p>}

                        <div>
                            <Label className="text-muted-foreground text-xs">Fecha de inicio</Label>
                            <Input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} />
                            {errors.start_date && <p className="text-sm text-red-500">{errors.start_date}</p>}
                        </div>
                    </section>

                    {/* Pago */}
                    <section className="space-y-3">
                        <h2 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Forma de pago</h2>
                        <div className="flex flex-wrap gap-2">
                            {PAYMENT_METHODS.map((p) => (
                                <Button
                                    key={p.key}
                                    type="button"
                                    variant={data.payment_method === p.key ? 'default' : 'outline'}
                                    onClick={() => setData('payment_method', p.key)}
                                >
                                    {p.label}
                                </Button>
                            ))}
                        </div>
                        {errors.payment_method && <p className="text-sm text-red-500">{errors.payment_method}</p>}

                        {selected && (
                            <p className="text-sm">
                                Total a cobrar: <span className="font-bold">${selected.price}</span>
                            </p>
                        )}
                    </section>

                    <Button disabled={processing} type="submit">
                        Registrar Cliente
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}

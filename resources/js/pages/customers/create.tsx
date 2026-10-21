import { Field, FormSection, labelClass } from '@/components/form-parts';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Membership, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { BadgeCheck, Banknote, CheckCircle, CreditCard, Landmark, Mail, Phone, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Clientes', href: '/customers' },
    { title: 'Crear Cliente', href: '/customers/create' },
];

const PAYMENT_METHODS = [
    { key: 'card', label: 'Tarjeta', icon: CreditCard },
    { key: 'transfer', label: 'Transferencia', icon: Landmark },
    { key: 'cash', label: 'Efectivo', icon: Banknote },
];

const DURATION_LABEL: Record<string, string> = { weekly: '/semana', monthly: '/mes', year: '/año' };

const optionClass = (selected: boolean, on: string, off: string) => `cursor-pointer rounded-xl transition-all ${selected ? on : off}`;

export default function Create({ memberships }: { memberships: Membership[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        membership_id: '',
        payment_method: 'card',
        start_date: new Date().toISOString().split('T')[0],
    });

    const selected = memberships.find((m) => String(m.id) === data.membership_id);
    const total = selected ? Number(selected.price).toFixed(2) : '0.00';
    const canSubmit = !processing && !!selected;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('customers.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Socio" />
            <div className="bg-background flex w-full flex-col gap-6 px-6 py-6">
                <Heading title="Nuevo Socio" description="Registra un nuevo socio y su plan de membresía.">
                    <Link href={route('customers.index')}>
                        <Button variant="outline">Cancelar</Button>
                    </Link>
                </Heading>

                <form id="socio-alta-form" onSubmit={handleSubmit} className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-12">
                    <div className="flex flex-col gap-6 lg:col-span-7">
                        <FormSection icon={<User size={24} />} title="1. Datos del Cliente" subtitle="Información esencial de contacto">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field
                                    className="sm:col-span-2"
                                    label="Nombres y Apellidos *"
                                    placeholder="Ej. Mateo Alessandro Rossi"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                />
                                <Field
                                    label="Teléfono Celular *"
                                    type="tel"
                                    placeholder="+52 222 123 4567"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    error={errors.phone}
                                    icon={<Phone size={18} />}
                                />
                                <Field
                                    label="Correo Electrónico *"
                                    type="email"
                                    placeholder="correo@email.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    error={errors.email}
                                    icon={<Mail size={18} />}
                                />
                            </div>
                        </FormSection>

                        <FormSection icon={<BadgeCheck size={24} />} title="2. Plan de Membresía" subtitle="Selecciona el tipo de suscripción">
                            <div className="flex flex-col gap-2">
                                {memberships.map((m) => {
                                    const isSelected = data.membership_id === String(m.id);
                                    return (
                                        <label
                                            key={m.id}
                                            className={`${optionClass(isSelected, 'bg-accent shadow-md', 'bg-accent/40 hover:bg-accent')} flex items-center justify-between p-3`}
                                        >
                                            <input
                                                type="radio"
                                                name="membership_id"
                                                className="sr-only"
                                                checked={isSelected}
                                                onChange={() => setData('membership_id', String(m.id))}
                                            />
                                            <div className="flex items-center gap-3">
                                                <div className={`h-2 w-2 rounded-full ${isSelected ? 'bg-primary' : 'bg-transparent'}`} />
                                                <div className="flex flex-col">
                                                    <span className={`text-foreground ${isSelected ? 'font-bold' : 'font-medium'}`}>{m.name}</span>
                                                    {m.description && <span className="text-tertiary text-sm">{m.description}</span>}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`block text-lg font-bold ${isSelected ? 'text-tertiary' : 'text-foreground'}`}>
                                                    ${m.price}
                                                </span>
                                                <span className="text-tertiary block text-xs">{DURATION_LABEL[m.duration] ?? ''}</span>
                                            </div>
                                        </label>
                                    );
                                })}
                                {errors.membership_id && <p className="text-destructive text-sm">{errors.membership_id}</p>}
                            </div>

                            <Field
                                label="Fecha de Inicio"
                                type="date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                error={errors.start_date}
                            />
                        </FormSection>
                    </div>

                    <FormSection className="lg:col-span-5" icon={<Banknote size={24} />} title="3. Método de Pago" subtitle="Confirmación y cobro">
                        <div className="grid grid-cols-3 gap-2">
                            {PAYMENT_METHODS.map(({ key, label, icon: Icon }) => (
                                <label
                                    key={key}
                                    className={`${optionClass(data.payment_method === key, 'bg-primary text-white', 'bg-accent/40 text-foreground hover:bg-accent')} flex flex-col items-center gap-1 p-3`}
                                >
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        className="sr-only"
                                        checked={data.payment_method === key}
                                        onChange={() => setData('payment_method', key)}
                                    />
                                    <Icon size={20} />
                                    <span className="text-xs font-semibold">{label}</span>
                                </label>
                            ))}
                        </div>
                        {errors.payment_method && <p className="text-destructive text-sm">{errors.payment_method}</p>}

                        <div className="bg-accent/40 flex flex-col gap-2 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <span className={labelClass}>Total a Cobrar</span>
                                <span className="text-tertiary text-2xl font-bold">${total}</span>
                            </div>
                            <span className="text-muted-foreground text-sm">
                                {selected ? `Primer periodo del plan ${selected.name}` : 'Selecciona un plan para ver el total'}
                            </span>
                        </div>

                        <Button type="submit" disabled={!canSubmit} className="w-full gap-2">
                            <CheckCircle size={20} />
                            Confirmar Pago y Registrar
                        </Button>
                    </FormSection>
                </form>
            </div>
        </AppLayout>
    );
}

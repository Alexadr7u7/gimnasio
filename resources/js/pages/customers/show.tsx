import { FormSection } from '@/components/form-parts';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import MembershipStatusBadge from '@/components/ui/membership-status-badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Customer, PaymentRow, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, CreditCard, Pencil, ScrollText, User } from 'lucide-react';
const PAYMENT_METHODS = [
    { key: 'card', label: 'Tarjeta', icon: CreditCard },
    { key: 'transfer', label: 'Transferencia' },
    { key: 'cash', label: 'Efectivo' },
];
export default function Show({ customer, payments }: { customer: Customer; payments: PaymentRow[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Clientes', href: route('customers.index') },
        { title: customer.name, href: route('customers.show', customer.id) },
    ];
    const membership = customer.latest_membership;
    const daysUntil = (dateString: string) => {
        const target = new Date(dateString);
        const today = new Date();
        const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (diff > 0) return ` ${diff} días restantes`;
        if (diff < 0) return `Hace ${Math.abs(diff)} días`;
        return 'Hoy';
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={customer.name} />
            <div className="bg-background w-full px-6 py-6">
                <Heading title={customer.name} description="Datos del cliente, membresía actual e historial de pagos.">
                    <div className="px-4 py-3.5">
                        {membership ? (
                            <MembershipStatusBadge status={membership.computed_status} />
                        ) : (
                            <span className="text-muted-foreground text-xs">—</span>
                        )}
                    </div>
                    <Link href={route('customers.edit', customer.id)}>
                        <Button variant="tertiary" className="gap-2">
                            <Pencil size={16} />
                            Editar
                        </Button>
                    </Link>
                    <Link href="">
                        <Button className="gap-2">
                            <CreditCard size={5} />
                            Registrar pago
                        </Button>
                    </Link>
                </Heading>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormSection icon={<User size={24} />} title="Datos del Socio">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-muted-foreground text-xs uppercase">Nombres y Apellidos</span>
                                <span className="text-foreground text-sm font-medium">{customer.name}</span>
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <span className="text-muted-foreground text-xs uppercase">Teléfono Celular</span>
                                <span className="text-foreground text-sm font-medium">{customer.phone}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-muted-foreground text-xs uppercase">Correo Electrónico</span>
                                <span className="text-foreground text-sm font-medium">{customer.email}</span>
                            </div>
                        </div>
                    </FormSection>

                    <FormSection icon={<Calendar size={24} />} title="Plan y Fechas">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-muted-foreground text-xs uppercase">Plan Actual</span>
                                {membership ? (
                                    <span className="text-tertiary text-base font-bold">{membership.membership.name}</span>
                                ) : (
                                    <span className="text-muted-foreground text-sm">Sin membresía</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-muted-foreground text-xs uppercase">Estado de Renovación</span>
                                <span className="text-foreground flex items-center gap-1.5 text-sm font-medium">
                                    <span className="bg-primary h-2 w-2 rounded-full"></span>
                                    {membership ? daysUntil(membership.end_date) : 'Sin membresía'}
                                </span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-muted-foreground text-xs uppercase">Fecha de Inicio</span>
                                <span className="text-foreground text-sm font-medium">{membership ? membership.start_date : ''}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-muted-foreground text-xs uppercase">Fecha de Vencimiento</span>
                                <span className="text-foreground text-sm font-medium">{membership ? membership.end_date : ''}</span>
                            </div>
                        </div>
                    </FormSection>
                </div>

                <FormSection icon={<ScrollText size={24} />} title="Historial de Pagos" className="mt-6">
                    <Table>
                        <TableHeader>
                            <TableRow className="h-11 tracking-wider uppercase">
                                <TableHead className="px-4">Fecha</TableHead>
                                <TableHead className="px-4">Concepto</TableHead>
                                <TableHead className="px-4">Método de Pago</TableHead>
                                <TableHead className="px-4 text-right font-semibold">Monto</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-border divide-y">
                            {payments.map((payment) => (
                                <TableRow key={payment.id} className="group hover:bg-accent/40 transition-colors">
                                    <TableCell className="px-4 py-3.5">{payment.created_at}</TableCell>
                                    <TableCell className="px-4 py-3.5">{payment.concept}</TableCell>
                                    <TableCell className="px-4 py-3.5">
                                        {PAYMENT_METHODS.find((m) => m.key === payment.payment_method)?.label}
                                    </TableCell>
                                    <TableCell className="px-4 py-3.5 text-right font-semibold">${payment.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </FormSection>
            </div>
        </AppLayout>
    );
}

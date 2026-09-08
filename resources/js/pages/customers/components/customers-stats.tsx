import { Card } from '@/components/ui/card';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

export default function CustomerStats() {
    return (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group overflow-hidden p-4">
                <div className="bg-accent/30 group-hover:bg-accent/50 absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-xl transition-colors" />
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Total Clientes</span>
                    <span className="bg-accent text-tertiary flex items-center gap-0.5 rounded px-2 py-0.5 text-xs font-medium">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        +12%
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-foreground text-3xl font-bold">44</span>
                    <span className="text-muted-foreground text-sm">registrados</span>
                </div>
            </Card>

            <Card className="group overflow-hidden p-4">
                <div className="bg-primary/10 group-hover:bg-primary/20 absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-xl transition-colors" />
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Clientes Activos</span>
                    <span className="bg-primary/15 text-tertiary rounded px-2 py-0.5 text-xs font-semibold">73%</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-tertiary text-3xl font-bold">3</span>
                    <span className="text-muted-foreground text-sm">habilitados</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                    <div className="bg-accent h-1.5 flex-1 overflow-hidden rounded-full">
                        <div className="bg-primary h-full rounded-full" style={{ width: '73%' }} />
                    </div>
                    <span className="text-tertiary text-xs font-bold">33 / 44</span>
                </div>
            </Card>

            <Card className="group overflow-hidden p-4">
                <div className="bg-destructive/10 absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-xl" />
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Vencimientos Próximos</span>
                    <span className="bg-destructive/10 text-tertiary flex items-center gap-1 rounded px-2 py-0.5 text-xs">
                        <span className="bg-destructive h-1.5 w-1.5 animate-ping rounded-full" />7 días
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-tertiary text-3xl font-bold">45</span>
                    <span className="text-muted-foreground text-sm">por renovar</span>
                </div>
            </Card>

            <Card className="group overflow-hidden p-4">
                <div className="bg-accent/40 absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-xl" />
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Nuevas Altas</span>
                    <span className="bg-accent text-foreground rounded px-2 py-0.5 text-xs">Este Mes</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-foreground text-3xl font-bold">5</span>
                    <span className="text-muted-foreground text-sm">ingresos</span>
                </div>
                <div className="text-tertiary mt-3 flex items-center gap-1 text-xs">
                    <TrendingUp className="h-4 w-4" />
                    Meta alcanzada
                </div>
            </Card>
        </div>
    );
}

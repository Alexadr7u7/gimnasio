import { Card } from '@/components/ui/card';
import { Stats } from '@/types';

export default function CustomerStats({ stats }: { stats: Stats }) {
    const percentage = stats.all > 0 ? Math.round((stats.active / stats.all) * 100) : 0;
    return (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group overflow-hidden p-4">
                <div className="bg-accent/30 group-hover:bg-accent/50 absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-xl transition-colors" />
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-tertiary text-xs font-medium tracking-wider uppercase">Total Clientes</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">{stats.all}</span>
                    <span className="text-muted-foreground text-sm">registrados</span>
                </div>
            </Card>

            <Card className="group overflow-hidden p-4">
                <div className="bg-primary/10 group-hover:bg-primary/20 absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-xl transition-colors" />
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-tertiary text-xs font-medium tracking-wider uppercase">Clientes Activos</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-tertiary text-5xl font-bold">{stats.active}</span>
                    <span className="text-muted-foreground text-sm">habilitados</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                    <div className="bg-accent h-1.5 flex-1 overflow-hidden rounded-full">
                        <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-tertiary text-xs font-bold">
                        {stats.active} / {stats.all}
                    </span>
                </div>
            </Card>

            <Card className="group overflow-hidden p-4">
                <div className="bg-destructive/10 absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-xl" />
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Vencimientos Próximos</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-tertiary text-5xl font-bold">{stats.expiring}</span>
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
                    <span className="text-foreground text-5xl font-bold">{stats.new_this_month}</span>
                    <span className="text-muted-foreground text-sm">ingresos</span>
                </div>
            </Card>
        </div>
    );
}

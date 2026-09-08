// @/components/membership-status-badge.tsx
type Status = 'active' | 'inactive' | 'expiring_soon' | 'expired';

const statusConfig: Record<Status, { label: string; className: string; dotClass: string }> = {
    active: {
        label: 'Activo',
        className: 'bg-accent text-tertiary',
        dotClass: 'bg-primary animate-pulse',
    },
    expiring_soon: {
        label: 'Por Vencer',
        className: 'bg-secondary/15 text-secondary',
        dotClass: 'bg-secondary animate-ping',
    },
    expired: {
        label: 'Vencido',
        className: 'bg-destructive/10 text-destructive',
        dotClass: 'bg-destructive',
    },
    inactive: {
        label: 'Inactivo',
        className: 'bg-muted text-muted-foreground',
        dotClass: 'bg-muted-foreground',
    },
};

export default function MembershipStatusBadge({ status }: { status: Status }) {
    const config = statusConfig[status];

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}>
            <span className={`h-2 w-2 rounded-full ${config.dotClass}`} />
            {config.label}
        </span>
    );
}
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export const labelClass = 'text-tertiary text-xs font-medium tracking-wider uppercase';
export const inputClass =
    'bg-accent/40 text-foreground placeholder:text-muted-foreground focus:bg-accent h-10 w-full rounded-lg px-3 text-sm transition-colors focus:outline-none';

export function FormSection({
    icon,
    title,
    subtitle,
    children,
    className,
}: {
    icon: ReactNode;
    title: string;
    subtitle: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section className={cn('bg-card flex flex-col gap-4 rounded-xl p-6 shadow-md', className)}>
            <div className="flex items-center gap-3">
                <div className="bg-accent text-tertiary flex h-8 w-8 items-center justify-center rounded-lg">{icon}</div>
                <div>
                    <h2 className="text-foreground text-base font-semibold">{title}</h2>
                    <span className="text-tertiary text-xs tracking-wider uppercase">{subtitle}</span>
                </div>
            </div>
            {children}
        </section>
    );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    icon?: ReactNode;
    className?: string;
};

export function Field({ label, error, icon, className, ...props }: FieldProps) {
    return (
        <div className={cn('flex flex-col gap-1.5', className)}>
            <label className={labelClass}>{label}</label>
            <div className="relative">
                <input {...props} className={cn(inputClass, icon && 'pr-10')} />
                {icon && <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">{icon}</span>}
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
    );
}

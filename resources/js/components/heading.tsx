import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type PageHeaderProps = {
    title: string;
    description?: string;
    children?: ReactNode; // acciones (botones, links)
    className?: string;
};
export default function Heading({ title, description, children, className }: PageHeaderProps) {
    return (
        <div className={cn('mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-center', className)}>
            <div>
                <h1 className="text-foreground text-3xl font-bold tracking-tight">{title}</h1>
                {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
            </div>

            {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
        </div>
    );
}

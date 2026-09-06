import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filters, PageLinkItem } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
    links: PageLinkItem[];
    currentPage: number;
    setCurrentPage: (value: number) => void;
    filters: Filters;
};

export default function Pagination({ links, currentPage, setCurrentPage, filters }: PaginationProps) {
    const handleChange = (value: string) => {
        const newPerPage = value;
        setCurrentPage(parseInt(newPerPage));

        router.get(
            route('customers.index'),
            { ...filters, perPage: newPerPage },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center space-x-2">
                <Label className="text-muted-foreground text-xs tracking-wider uppercase">Por página</Label>
                <Select value={currentPage.toString()} onValueChange={handleChange}>
                    <SelectTrigger className="border-border bg-accent/40 text-foreground w-full max-w-32">
                        <SelectValue placeholder="Per page" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="15">15</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1">
                {links.map((link, index) => {
                    const isPrevNext =
                        link.label.includes('Previous') ||
                        link.label.includes('Next') ||
                        link.label.includes('pagination.previous') ||
                        link.label.includes('pagination.next');
                    const isDisabled = !link.url;

                    return (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            preserveState
                            preserveScroll
                            className={`flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg px-2.5 text-xs font-medium transition-colors ${
                                link.active
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : isDisabled
                                      ? 'bg-accent/30 text-muted-foreground pointer-events-none opacity-40'
                                      : 'bg-accent/40 text-foreground hover:bg-accent'
                            }`}
                        >
                            {link.label.includes('Previous') ? (
                                <>
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">Anterior</span>
                                </>
                            ) : link.label.includes('Next') ? (
                                <>
                                    <span className="hidden sm:inline">Siguiente</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </>
                            ) : (
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

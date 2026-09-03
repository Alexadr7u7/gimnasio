import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filters, PageLinkItem } from '@/types';
import { Link, router } from '@inertiajs/react';

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
        <div className="flex items-center justify-between">
            <div className="itemns-center flex space-x-2">
                <Label>Per page</Label>
                <Select value={currentPage.toString()} onValueChange={handleChange}>
                    <SelectTrigger className="w-full max-w-48">
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
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`rounded-md border px-3 py-1 ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    />
                ))}
            </div>
        </div>
    );
}

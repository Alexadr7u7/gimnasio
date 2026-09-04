import { Filters } from "@/types"
import { Link, usePage } from "@inertiajs/react"
import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react"

type SortLinkProps = {
    filters: Filters,
    field: string,
    label: string
}

export default function SortLink({ filters, field, label }: SortLinkProps) {
    return (
        <>
            {
                filters.sortBy !== field ? (
                    <Link
                        className="flex items-center space-x-2"
                        href={route('customers.index')}
                        data={{ ...filters, sortDirection: 'DESC', sortBy: field }}
                    >
                        <span>{label}</span>
                        <ArrowDownUp size={18} />
                    </Link>
                ) : filters.sortBy === field && filters.sortDirection === 'DESC' ? (
                    <Link
                        className="flex items-center space-x-2"
                        href={route('customers.index')}
                        data={{ ...filters, sortDirection: 'ASC', sortBy: field }}
                    >
                        <span>{label}</span>
                        <ArrowDownWideNarrow size={18} />
                    </Link>
                ) : (
                    <Link
                        className="flex items-center space-x-2"
                        href={route('customers.index')}
                        data={{ ...filters, sortDirection: 'DESC', sortBy: field }}
                    >
                        <span>{label}</span>
                        <ArrowUpNarrowWide size={18} />
                    </Link>
                )
            }
        </>
    )
}
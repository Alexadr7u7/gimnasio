import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Membership {
    id: number;
    name: string;
    price: number;
    duration: number;
}

export interface CustomerMembership {
    id: number;
    status: 'active' | 'inactive' | 'expiring_soon' | 'expired';
    computed_status: 'active' | 'inactive' | 'expiring_soon' | 'expired';
    start_date: string;
    end_date: string;
    membership: Membership;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
    latest_membership: CustomerMembership | null;
}
export interface PageLinkItem {
    url: string | null;
    label: string;
    active: boolean;
}

export type Filters = {
    search: string;
    perPage: number;
    sortBy: string;
    sortDirection: 'asc' | 'desc';
    plan?: string;
    status?: string;
};

export type Stats = {
    all: number;
    active: number;
    expiring: number;
    expired: number;
    new_this_month: number;
};

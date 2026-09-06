import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}) {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="relative z-10 my-auto w-full max-w-md">
                <div className="flex flex-col gap-6">
                    <Card className="rounded-2xl">
                        <CardHeader className="px-10 pt-8 pb-0 text-center">
                            <Link href={route('home')} className="flex items-center gap-2 self-center font-medium">
                                <div className="bg-dark-800 group mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 shadow-inner">
                                    <AppLogoIcon className="size-9 fill-current text-black dark:text-white" />
                                </div>
                            </Link>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent className="py-8">{children}</CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

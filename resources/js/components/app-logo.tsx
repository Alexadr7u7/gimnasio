import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="dark:text-primary size-30 fill-current text-white" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Gimnasio</span>
            </div>
            <span className="bg-accent text-tertiary rounded px-2 py-1 text-xs tracking-wider uppercase"> v2.4</span>
        </>
    );
}

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle, Lock, ShieldCheck, User } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Acceso a Plataforma" description="Gestiona miembros y operaciones de tu gimnasio desde un solo lugar.">
            <Head title="Log in" />

            <form className="space-y-4" onSubmit={submit}>
                <div className="bg-dark-950/60 mb-5 flex items-center justify-center gap-2 rounded-lg border border-white/5 px-3 py-2 text-xs text-gray-400">
                    <ShieldCheck className="text-primary h-3.5 w-3.5" />
                    <span className="text-[11px] font-medium tracking-wider text-gray-300 uppercase">Portal de Acceso Administrativo Exclusivo</span>
                </div>

                <div className="grid gap-1.5">
                    <Label htmlFor="email" className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                        Usuario o Correo Electrónico
                    </Label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                            <User className="h-4 w-4" />
                        </div>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="nombre@titangym.com"
                            className="bg-dark-950/90 focus-visible:ring-brand-500 border-white/10 pl-10 text-white placeholder-gray-600"
                        />
                    </div>
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-1.5">
                    <div className="mb-1.5 flex items-center justify-between">
                        <Label htmlFor="password" className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                            Contraseña
                        </Label>
                        {canResetPassword && (
                            <TextLink
                                href={route('password.request')}
                                className="text-brand-500 hover:text-brand-600 text-xs font-medium"
                                tabIndex={5}
                            >
                                ¿Olvidaste tu clave?
                            </TextLink>
                        )}
                    </div>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                            <Lock className="h-4 w-4" />
                        </div>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            className="bg-dark-950/90 focus-visible:ring-brand-500 border-white/10 pr-10 pl-10 tracking-widest text-white placeholder-gray-600"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 hover:text-gray-300"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex cursor-pointer items-center gap-2 select-none">
                        <Checkbox id="remember" name="remember" tabIndex={3} className="accent-brand-500" />
                        <span className="text-xs text-gray-400">Recordar sesión (30 días)</span>
                    </label>
                    <span className="flex items-center gap-1 text-[11px] text-gray-500">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                        256-bit SSL
                    </span>
                </div>

                <div className="pt-2">
                    <Button variant="default" type="submit" tabIndex={4} disabled={processing} className="flex w-full items-center justify-center">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        <span>Iniciar Sesión</span>
                    </Button>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}

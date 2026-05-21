// app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const schema = z.object({
  email:    z.string().email('Email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading]  = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email:    data.email,
        password: data.password,
      });
      if (error) throw error;
      toast.success('Connexion réussie !');
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display font-800 text-3xl mb-2">Bon retour 👋</h1>
        <p className="text-dark-300">Connectez-vous à votre compte BetZone.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-500 text-dark-200 mb-2">
            Adresse email
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="vous@example.com"
            className="input"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-danger text-xs mt-1.5">{errors.email.message}</p>
          )}
        </div>

        {/* Mot de passe */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-500 text-dark-200">Mot de passe</label>
            <Link href="/auth/forgot-password"
              className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
              Oublié ?
            </Link>
          </div>
          <div className="relative">
            <input
              {...register('password')}
              type={showPwd ? 'text' : 'password'}
              placeholder="••••••••"
              className="input pr-12"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors">
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-danger text-xs mt-1.5">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-2">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogIn className="w-4 h-4" />
          )}
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-white/8" />
        <span className="text-dark-400 text-xs">ou continuer avec</span>
        <div className="flex-1 h-px bg-white/8" />
      </div>

      {/* Social login */}
      <button
        onClick={async () => {
          await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth/callback` },
          });
        }}
        className="btn-ghost w-full py-3.5 gap-3">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continuer avec Google
      </button>

      <p className="text-center text-dark-400 text-sm mt-8">
        Pas encore de compte ?{' '}
        <Link href="/auth/register" className="text-brand-400 hover:text-brand-300 font-500 transition-colors">
          S'inscrire gratuitement
        </Link>
      </p>
    </div>
  );
}

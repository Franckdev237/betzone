'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, UserPlus, Loader2, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const schema = z.object({
  username: z.string()
    .min(3, 'Minimum 3 caractères')
    .max(20, 'Maximum 20 caractères')
    .regex(/^[a-zA-Z0-9_]+$/, 'Lettres, chiffres et _ uniquement'),
  email:     z.string().email('Email invalide'),
  password: z.string()
    .min(8, 'Minimum 8 caractères')
    .regex(/[A-Z]/, 'Au moins 1 majuscule')
    .regex(/[0-9]/, 'Au moins 1 chiffre'),
  terms: z.boolean().refine(v => v, 'Vous devez accepter les CGU'),
});

type FormData = z.infer<typeof schema>;

const PWD_CHECKS = [
  { label: '8 caractères minimum', test: (p: string) => p.length >= 8 },
  { label: 'Une majuscule',        test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Un chiffre',           test: (p: string) => /[0-9]/.test(p) },
];

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading]  = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const pwd = watch('password') ?? '';

  // Fonction utilitaire pour calculer dynamiquement l'URL de redirection de manière sûre
  const getRedirectUrl = () => {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;
    }
    // Fallback safe si on est sur le navigateur
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/auth/callback`;
    }
    return 'http://localhost:3000/auth/callback';
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email:    data.email,
        password: data.password,
        options: {
          data: { username: data.username },
          // Utilisation de l'URL calculée de façon robuste
          emailRedirectTo: getRedirectUrl(),
        },
      });
      if (error) throw error;
      toast.success('Compte créé ! Vérifiez votre email.');
      router.push('/auth/verify-email');
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display font-800 text-3xl mb-2">Créer un compte 🚀</h1>
        <p className="text-dark-300">Rejoignez des milliers de parieurs sur BetZone.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-500 text-dark-200 mb-2">Pseudo</label>
          <input
            {...register('username')}
            type="text"
            placeholder="votre_pseudo"
            className="input"
            autoComplete="username"
          />
          {errors.username && (
            <p className="text-danger text-xs mt-1.5">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-500 text-dark-200 mb-2">Email</label>
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

        {/* Password */}
        <div>
          <label className="block text-sm font-500 text-dark-200 mb-2">Mot de passe</label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPwd ? 'text' : 'password'}
              placeholder="••••••••"
              className="input pr-12"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors">
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {/* Password strength */}
          {pwd.length > 0 && (
            <div className="mt-2 space-y-1">
              {PWD_CHECKS.map(c => (
                <div key={c.label} className="flex items-center gap-2 text-xs">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                    c.test(pwd) ? 'bg-success/20 text-success' : 'bg-white/5 text-dark-400'
                  }`}>
                    {c.test(pwd) && <Check className="w-2.5 h-2.5" />}
                  </div>
                  <span className={c.test(pwd) ? 'text-success' : 'text-dark-400'}>
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          )}
          {errors.password && (
            <p className="text-danger text-xs mt-1.5">{errors.password.message}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <input
            {...register('terms')}
            type="checkbox"
            id="terms"
            className="mt-0.5 w-4 h-4 accent-brand-500"
          />
          <label htmlFor="terms" className="text-sm text-dark-300 leading-relaxed">
            J'accepte les{' '}
            <Link href="/terms" className="text-brand-400 hover:text-brand-300">CGU</Link>
            {' '}et la{' '}
            <Link href="/privacy" className="text-brand-400 hover:text-brand-300">politique de confidentialité</Link>.
            Je confirme avoir 18 ans ou plus.
          </label>
        </div>
        {errors.terms && (
          <p className="text-danger text-xs">{errors.terms.message}</p>
        )}

        {/* Submit */}
        <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-2">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <UserPlus className="w-4 h-4" />
          )}
          {loading ? 'Création...' : 'Créer mon compte'}
        </button>
      </form>

      <p className="text-center text-dark-400 text-sm mt-6">
        Déjà un compte ?{' '}
        <Link href="/auth/login" className="text-brand-400 hover:text-brand-300 font-500 transition-colors">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
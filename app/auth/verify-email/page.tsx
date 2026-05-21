// app/auth/verify-email/page.tsx
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <div className="animate-fade-in text-center">
      {/* Icône */}
      <div className="w-20 h-20 rounded-2xl bg-brand-500/10 border border-brand-500/20
                      flex items-center justify-center mx-auto mb-6">
        <Mail className="w-9 h-9 text-brand-400" />
      </div>

      {/* Titre */}
      <h1 className="font-display font-extrabold text-3xl mb-3">
        Vérifiez votre email 📬
      </h1>

      <p className="text-dark-300 mb-2">
        Un lien de confirmation a été envoyé à votre adresse email.
      </p>
      <p className="text-dark-400 text-sm mb-8">
        Cliquez sur le lien dans l'email pour activer votre compte,
        puis revenez vous connecter.
      </p>

      {/* Actions */}
      <div className="space-y-3">
        <Link href="/auth/login" className="btn-primary w-full py-3.5">
          Aller à la connexion
        </Link>
        <Link href="/" className="btn-ghost w-full py-3.5">
          Retour à l'accueil
        </Link>
      </div>

      <p className="text-dark-500 text-xs mt-8">
        Vous n'avez pas reçu l'email ? Vérifiez vos spams ou{' '}
        <Link href="/auth/register" className="text-brand-400 hover:text-brand-300">
          réessayez
        </Link>.
      </p>
    </div>
  );
}
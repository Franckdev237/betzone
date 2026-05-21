// app/dashboard/layout.tsx
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import Sidebar from '@/components/layout/Sidebar';
import TopBar  from '@/components/layout/TopBar';
import Betslip from '@/components/betting/Betslip';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/auth/login');

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      {/* ── Sidebar ────── */}
      <Sidebar />

      {/* ── Main ───────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={session.user} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>

      {/* ── Betslip ────── */}
      <Betslip />
    </div>
  );
}

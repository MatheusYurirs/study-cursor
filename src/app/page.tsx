'use client';

import { AuthButtons } from '@/components/auth-buttons';
import { trpc } from '@/utils/trpc';

export default function Home() {
  const healthcheck = trpc.healthcheck.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Bem-vindo ao seu App Next.js!</h1>

      <div className="flex flex-col items-center gap-4 mt-8">
        <AuthButtons />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Status do tRPC:</h2>
        {healthcheck.isLoading && <p>Carregando...</p>}
        {healthcheck.isError && <p>Erro: {healthcheck.error.message}</p>}
        {healthcheck.isSuccess && <p>Status: {healthcheck.data}</p>}
      </div>
    </main>
  );
}

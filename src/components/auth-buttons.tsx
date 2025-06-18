'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function SignInButton() {
  return (
    <Button size="xl" className="w-full" onClick={() => signIn('google')}>Sign in with Google</Button>
  );
}

export function SignOutButton() {
  return (
    <Button size="xl" className="w-full" onClick={() => signOut()}>Sign Out</Button>
  );
}

export function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <p className="text-lg">Signed in as {session.user?.email}</p>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <SignInButton />
    </div>
  );
} 
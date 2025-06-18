'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function SignInButton() {
  return (
    <Button onClick={() => signIn('google')}>Sign in with Google</Button>
  );
}

export function SignOutButton() {
  return (
    <Button onClick={() => signOut()}>Sign Out</Button>
  );
}

export function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p>Signed in as {session.user?.email}</p>
        <SignOutButton />
      </div>
    );
  }

  return <SignInButton />;
} 
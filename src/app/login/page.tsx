'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button'; // We will create this component

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <Button onClick={() => signIn('google')}>Sign in with Google</Button>
    </div>
  );
} 
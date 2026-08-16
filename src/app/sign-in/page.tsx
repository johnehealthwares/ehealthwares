'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { HexLogo } from '@/components/layout/Header';
import { storeTokens } from '@/lib/auth';

const inputClass =
  'w-full rounded-xl border border-navy-200 bg-white/80 px-4 py-3 text-sm text-navy-800 placeholder:text-navy-300 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-500';

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error || 'Sign in failed. Please check your credentials.');
        return;
      }
      if (data?.accessToken && data?.refreshToken) {
        storeTokens(data.accessToken, data.refreshToken);
        router.push('/');
      } else {
        setError('Sign in succeeded but no tokens were returned.');
      }
    } catch {
      setError('Unable to reach the identity service.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-hero-gradient px-4 py-24">
      <div className="pointer-events-none absolute inset-0 hex-pattern opacity-60" />
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="glass-card rounded-3xl p-8 sm:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <HexLogo size={52} />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-navy-900">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-navy-500">Sign in to your eHealthwares account</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="si-username" className={labelClass}>Username</label>
              <input
                id="si-username"
                type="text"
                autoComplete="username"
                className={inputClass}
                placeholder="you@organization.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="si-password" className={labelClass}>Password</label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="si-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`${inputClass} pr-12`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 transition-colors hover:text-navy-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-gradient w-full !py-3.5">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-navy-500">
            Don&apos;t have an account?{' '}
            <Link href="/contact" className="font-bold text-blue-600 hover:text-blue-700">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
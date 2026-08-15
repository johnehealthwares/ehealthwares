import type { Metadata } from 'next';
import Link from 'next/link';
import { HexLogo } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Sign In',
  robots: { index: false, follow: false },
};

const inputClass =
  'w-full rounded-xl border border-navy-200 bg-white/80 px-4 py-3 text-sm text-navy-800 placeholder:text-navy-300 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-500';

export default function SignInPage() {
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

          <form className="space-y-5">
            <div>
              <label htmlFor="si-email" className={labelClass}>Email</label>
              <input id="si-email" type="email" className={inputClass} placeholder="you@organization.com" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="si-password" className={labelClass}>Password</label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
              <input id="si-password" type="password" className={inputClass} placeholder="Enter your password" />
            </div>
            <button type="submit" className="btn-gradient w-full !py-3.5">
              Sign In
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

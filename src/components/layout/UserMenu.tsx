'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { IconChevronDown, IconLogout2, IconUserFilled } from '@tabler/icons-react';
import {
  AUTH_CHANGE_EVENT,
  clearTokens,
  decodeUserFromAccessToken,
  getAccessToken,
  type AuthUser,
} from '@/lib/auth';

export function UserMenu() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => {
      const token = getAccessToken();
      setUser(token ? decodeUserFromAccessToken(token) : null);
      setOpen(false);
    };
    sync();
    window.addEventListener(AUTH_CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50 hover:text-blue-600"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white">
          <IconUserFilled size={16} />
        </span>
        <span className="max-w-[120px] truncate">{user.username}</span>
        <IconChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-xl shadow-navy-900/10" role="menu">
          <div className="flex items-center gap-3 border-b border-navy-100 bg-navy-50/60 px-4 py-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white">
              <IconUserFilled size={18} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-navy-900">{user.username}</p>
              <p className="truncate text-xs text-navy-500">
                {user.roles.length > 0 ? user.roles.join(', ') : 'User'}
              </p>
            </div>
          </div>

          <div className="border-b border-navy-100 px-4 py-3 text-xs text-navy-500">
            <p className="truncate">User ID: {user.id}</p>
            {user.email && user.email !== user.id && (
              <p className="mt-1 truncate">Email: {user.email}</p>
            )}
            {user.phone && <p className="mt-1 truncate">Phone: {user.phone}</p>}
          </div>

          <div className="p-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50 hover:text-blue-600"
              role="menuitem"
            >
              Account Settings
            </Link>
            <button
              type="button"
              onClick={() => clearTokens()}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
              role="menuitem"
            >
              <IconLogout2 size={16} /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
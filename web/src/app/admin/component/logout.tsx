'use client';

import { useAuth } from '../lib/auth';

export function Logout() {
  const { logout } = useAuth();

  return (
    <>
      <a
        className='px-4 py-2 text-sm font-medium cursor-pointer bg-slate-600 text-white rounded-md hover:bg-slate-300 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 '
        onClick={logout}
      >
        Log out
      </a>
    </>
  );
}

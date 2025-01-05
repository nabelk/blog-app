'use client';

import { useAuth } from '../lib/auth';

export function Logout() {
  const { logout } = useAuth();

  return (
    <>
      <a className='cursor-pointer' onClick={logout}>
        Log out
      </a>
    </>
  );
}

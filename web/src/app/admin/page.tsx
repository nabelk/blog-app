'use client';

import { Login } from './component/login';
import { redirect } from 'next/navigation';

export default function Admin() {
  const token = localStorage.getItem('token');

  // if (token) redirect('/admin/dashboard');

  return (
    <>
      <Login />
    </>
  );
}

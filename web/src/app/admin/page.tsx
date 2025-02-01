'use client';

import { Login } from './component/login';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export default function Admin() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const tokenDecoded = token && jwtDecode(token);
    if (tokenDecoded && tokenDecoded.exp! > Date.now() / 1000)
      redirect('/admin/dashboard');
  }

  return (
    <>
      <Login />
    </>
  );
}

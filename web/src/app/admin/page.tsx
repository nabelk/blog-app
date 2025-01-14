'use client';

import { Login } from './component/login';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export default function Admin() {
  const token = localStorage.getItem('token');

  if (token) {
    const tokenDecoded = jwtDecode(token);
    if (tokenDecoded.exp! > Date.now() / 1000) redirect('/admin/dashboard');
  }

  return (
    <>
      <Login />
    </>
  );
}

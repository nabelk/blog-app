'use client';

import { Login } from './component/login';
import { isOneHour } from '../../../utils/date-helper';
import { redirect } from 'next/navigation';

export default function Admin() {
  const token = localStorage.getItem('token');
  const expToken = localStorage.getItem('expToken');

  if (token) {
    if (expToken && !isOneHour(new Date().toTimeString(), expToken))
      redirect('/admin/dashboard');
  }

  return (
    <>
      <Login />
    </>
  );
}

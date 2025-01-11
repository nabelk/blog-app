'use client';
import { AdminHome } from './component/admin-home';
import { Logout } from '../component/logout';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const token = localStorage.getItem('token');
  if (!token) redirect('/admin');

  if (token)
    return (
      <>
        <header className='p-3 px-5 flex justify-between flex-wrap'>
          <h1>Nabil Khalid</h1>
          <Logout />
        </header>
        <AdminHome />
      </>
    );
}

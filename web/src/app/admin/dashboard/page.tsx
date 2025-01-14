'use client';
import { AdminHome } from './component/admin-home';
import { Logout } from '../component/logout';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

export default function AdminPage() {
  const token = localStorage.getItem('token');
  const tokenDecoded = token && jwtDecode<DecodedToken>(token);

  if (!token || (tokenDecoded && tokenDecoded.exp < Date.now() / 1000)) {
    return redirect('/admin');
  }

  if (tokenDecoded && tokenDecoded.exp > Date.now() / 1000)
    return (
      <>
        <header className='p-3 px-5 flex justify-between flex-wrap'>
          <h1 className='text-lg font-extrabold '>Nabil Khalid</h1>
          <Logout />
        </header>
        <AdminHome />
      </>
    );
}

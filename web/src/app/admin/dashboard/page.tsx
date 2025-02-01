'use client';
import { AdminHome } from './component/admin-home';
import { Logout } from '../component/logout';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

interface DecodedToken {
  exp: number;
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [tokenDecoded, setTokenDecoded] = useState<DecodedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);

      if (storedToken) {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        setTokenDecoded(decoded);

        if (decoded.exp < Date.now() / 1000) {
          router.push('/admin');
        }
      } else {
        router.push('/admin');
      }
    }
  }, [router]);

  if (!token || !tokenDecoded) {
    return null;
  }
  return (
    <>
      <header className='w-full p-3 pt-20 px-5 flex max-w-screen-xl overflow-hidden  md:mx-auto md:flex-row md:items-center justify-between'>
        <h1 className='text-lg font-extrabold '>Nabil Khalid</h1>
        <Logout />
      </header>
      <AdminHome />
    </>
  );
}

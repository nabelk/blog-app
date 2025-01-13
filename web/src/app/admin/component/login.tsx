'use client';

import { ChangeEvent, useState } from 'react';
import { useAuth } from '../lib/auth';

interface LoginCredential {
  email: string;
  password: string;
}

export function Login() {
  const [loginCredential, setLoginCredential] = useState<LoginCredential>({
    email: '',
    password: '',
  });
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    await login(loginCredential.email, loginCredential.password);
  };

  return (
    <>
      <div className='flex h-screen w-screen justify-center items-center overflow-hidden px-2'>
        <div className='relative flex w-96 flex-col space-y-5 rounded-lg border bg-[#99B898] px-5 py-10 shadow-xl sm:mx-auto'>
          <div className='mx-auto mb-2 space-y-3'>
            <p className='text-white'>Sign in as Admin</p>
          </div>

          <div>
            <div className='relative mt-2 w-full'>
              <input
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setLoginCredential((prevCredential) => ({
                    ...prevCredential,
                    email: event.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLogin();
                }}
                type='email'
                id='email'
                value={loginCredential.email}
                className='border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-sky-600 focus:outline-none focus:ring-0'
              />
              <label
                htmlFor='email'
                className='origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-sky-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300'
              >
                Email
              </label>
            </div>
          </div>

          <div>
            <div className='relative mt-2 w-full'>
              <input
                type='password'
                id='password'
                value={loginCredential.password}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLogin();
                }}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setLoginCredential((prevCredential) => ({
                    ...prevCredential,
                    password: event.target.value,
                  }))
                }
                className='border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-sky-600 focus:outline-none focus:ring-0'
              />
              <label
                htmlFor='password'
                className='origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-sky-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300'
              >
                Password
              </label>
            </div>
          </div>
          <div>{error && <p className='text-red-600'>{error}</p>}</div>
          <div className='flex w-full items-center'>
            <button
              onClick={handleLogin}
              className={`shrink-0 inline-block w-36 rounded-lg py-3 font-bold text-white hover:bg-slate-300 hover:text-slate-600   ${
                loading ? 'cursor-not-allowed bg-slate-400' : ' bg-slate-600'
              }`}
            >
              {loading ? 'Loading..' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

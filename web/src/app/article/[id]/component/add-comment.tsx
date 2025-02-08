'use client';

import { useEffect, useRef, useState } from 'react';
import axios, { InternalAxiosRequestConfig, isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export function AddComment({
  postId,
  apiUrl,
}: {
  postId: number;
  apiUrl: string | undefined;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem('scrollAfterComment');
    if (shouldScroll === 'true') {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
        sessionStorage.removeItem('scrollAfterComment');
      }, 500);
    }
  });

  async function action(data: FormData): Promise<void> {
    const [name, comment] = [data.get('name'), data.get('comment')];

    try {
      await axios.post(
        `${apiUrl}/api/comment/create/${postId}`,
        {
          name,
          comment,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      sessionStorage.setItem('scrollAfterComment', 'true');
      setIsLoading(false);
      router.refresh();
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const { response, status, config } = err;

        if (status === 500) return axios(config as InternalAxiosRequestConfig);

        if (status === 400) {
          setIsLoading(false);
          setErr(response?.data.errors[0]);
          setTimeout(() => {
            setErr(null);
          }, 1000);
          return;
        }
      }
      setIsLoading(false);
      setErr('Failed to create comment');
      setTimeout(() => {
        setErr(null);
      }, 1000);
    }
  }

  return (
    <form ref={formRef} action={action} className='mb-8'>
      <div className='mb-4'>
        <label htmlFor='name' className='block text-gray-800 font-medium'>
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className='border-2 border-[#99B898] p-2 w-[60%] rounded'
          required
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='comment' className='block text-gray-800 font-medium'>
          Comment
        </label>
        <textarea
          id='comment'
          name='comment'
          className='border-2 border-[#99B898] p-2 w-[60%] rounded'
          required
        ></textarea>
      </div>

      <div>{err && <p className='text-red-600 mb-4'>{err}</p>}</div>

      <button
        type='submit'
        onClick={() => setIsLoading(true)}
        className={` font-medium py-2 px-4 rounded  ${
          isLoading
            ? 'bg-slate-300 cursor-not-allowed'
            : 'bg-slate-700 text-white hover:bg-slate-600'
        }`}
      >
        {isLoading ? 'Loading..' : 'Post Comment'}
      </button>
    </form>
  );
}

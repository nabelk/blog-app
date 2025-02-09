'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='w-full px-16 md:px-0 h-screen flex items-center justify-center'>
      <div className='border-2 border-[#99B898] flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-md'>
        <p className='text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500'>
          {error.message}
        </p>
        <p className='text-gray-500 mt-8 py-2 border-y-2 text-center'>
          Whoops, something went wrong on our servers.
        </p>
        <button
          className='mt-8 shrink-0 inline-block w-36 rounded-lg py-3 font-bold text-white hover:bg-slate-300 hover:text-slate-600 bg-slate-600'
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}

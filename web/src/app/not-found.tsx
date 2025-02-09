import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='w-full px-16 md:px-0 h-screen flex items-center justify-center'>
      <div className='border-2 border-[#99B898] flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-md'>
        <p className='text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500'>
          Whoops! Page not found
        </p>

        <Link
          href='/'
          className='text-center mt-8 shrink-0 inline-block w-36 rounded-lg py-3 font-bold text-white hover:bg-slate-300 hover:text-slate-600 bg-slate-600'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

'use client';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../lib/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Published({
  published,
  postId,
}: {
  published: boolean;
  postId: number;
}) {
  const router = useRouter();
  const [isPublished, setIsPublished] = useState<boolean>(published);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  async function handlePublished() {
    setIsUpdating(true);
    const token = localStorage.getItem('token');

    try {
      const res = await axios.patch(
        `${API_URL}/admin/posts/updatestatus/${postId}`,
        { status: !isPublished },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const {
        status,
        data: {
          postStatus: { published },
        },
      } = res;

      if (status === 201) {
        setIsPublished(published);
        setIsUpdating(false);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        router.push('/admin');
      }
    }
  }

  return (
    <>
      <button
        onClick={handlePublished}
        className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
          isPublished && !isUpdating && 'bg-green-400'
        } ${!isPublished && !isUpdating && 'bg-red-400'} ${
          isUpdating && 'cursor-not-allowed bg-gray-400'
        }`}
      >
        {isUpdating && 'Loading..'}
        {isPublished && !isUpdating && 'Published'}
        {!isPublished && !isUpdating && 'Unpublished'}
      </button>
    </>
  );
}

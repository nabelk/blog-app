import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../lib/auth';
import { useRouter } from 'next/navigation';

type HandleArticlesStateArgs = {
  action: 'delete';
  id: number;
};

export function DeletePost({
  postId,
  postTitle,
  handleArticlesState,
}: {
  postId: number;
  postTitle: string;
  handleArticlesState: (arg: HandleArticlesStateArgs) => void;
}) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handleDeletePost = async () => {
    const confirmation = confirm(`Are you sure want to ${postTitle}`);
    if (confirmation) {
      setIsDeleting(true);
      const token = localStorage.getItem('token');

      try {
        const res = await axios.delete(
          `${API_URL}/admin/posts/${postId}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { status } = res;

        if (status === 201) {
          setIsDeleting(false);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          router.push('/admin');
        }
      } finally {
        setIsDeleting(false);
        handleArticlesState({ action: 'delete', id: Number(postId) });
      }
    }
  };
  return (
    <>
      <button
        onClick={handleDeletePost}
        className={`px-3 py-1.5 bg-rose-500 text-white rounded-md hover:bg-rose-600 ${
          isDeleting && 'cursor-not-allowed bg-gray-400'
        } `}
      >
        {isDeleting ? 'Loading..' : 'Delete'}
      </button>
    </>
  );
}

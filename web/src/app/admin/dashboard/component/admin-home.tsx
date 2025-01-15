'use client';

import axios from 'axios';
import { API_URL } from '../../lib/auth';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Articles } from './articles';

interface Tag {
  tag: {
    id: number;
    tag: string;
  };
}

interface Posts {
  id: number;
  title: string;
  content: string;
  published: boolean;
  tags: Tag[];
}

export interface Data {
  posts: Posts[];
}

async function fetchData(token: string) {
  const res = await axios.get(`${API_URL}/admin/posts/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}

export function AdminHome() {
  const [auth, setAuth] = useState<boolean>(false);
  const [data, setData] = useState<Data>({ posts: [] });
  const token = localStorage.getItem('token') as string;

  if (!token) redirect('/admin');

  useEffect(() => {
    fetchData(token)
      .then((res) => {
        const { posts } = res.data;
        setData({ posts });
        setAuth(true);
      })
      .catch((err) => {
        setAuth(false);
        if (err.response.status === 401) {
          redirect('/admin');
        }
      });
  }, [token]);

  return (
    <>
      {auth && (
        <div>
          <Articles posts={data.posts} />
        </div>
      )}
    </>
  );
}

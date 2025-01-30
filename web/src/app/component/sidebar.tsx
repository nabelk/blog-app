'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../admin/lib/auth';
import { useSearchParams } from 'next/navigation';

interface Tag {
  id: number;
  tag: string;
}

export function Sidebar() {
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTag, setActiveTag] = useState<number | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchTags() {
      const { data } = await axios.get(`${API_URL}/api/tag/all`);
      return data;
    }

    fetchTags()
      .then((data) => {
        setTags(data.tags);
      })
      .catch(() => router.refresh());
  }, []);

  useEffect(() => {
    const tagId = searchParams.get('tag');
    const tagName = searchParams.get('tagName');

    if (!tagId || !tagName) {
      setActiveTag(null);
    } else {
      setActiveTag(parseInt(tagId, 10));
    }
  }, [searchParams]);

  function handleOnClick(tagId: number, tagName: string) {
    setActiveTag(tagId);
    router.push(`/?tag=${tagId}&tagName=${tagName}`);
  }

  return (
    <aside className='w-full p-6 min-[1340px]:w-60 min-[1340px]:my-20 mt-24'>
      <nav className='space-y-8 text-sm'>
        <div className='space-y-2'>
          <h2 className='text-sm font-semibold tracking-widest uppercase '>
            Tags
          </h2>
          <div className='flex flex-col space-y-1'>
            <ul className='max-[1340px]:inline-flex flex-wrap'>
              {tags.map((tag) => (
                <li
                  className={`mr-2 mt-1 rounded-2xl w-[fit-content] h-[fit-content]  py-1.5 px-4 text-xs text-white cursor-pointer  hover:bg-[#99B898] ${
                    activeTag === tag.id ? 'bg-[#99B898]' : ' bg-orange-500'
                  }`}
                  key={tag.id}
                  onClick={() => handleOnClick(tag.id, tag.tag)}
                >
                  {tag.tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </aside>
  );
}

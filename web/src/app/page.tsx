import axios from 'axios';
import { Articles } from './component/articles';
import { Sidebar } from './component/sidebar';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tag: string; tagName: string }>;
}) {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const { tag, tagName } = await searchParams;
  const { data } = tag
    ? await axios.get(`${NEXT_PUBLIC_API_URL}/api/post/tag/${tag}`)
    : await axios.get(`${NEXT_PUBLIC_API_URL}/api/post/all`);

  return (
    <div className='flex max-[1340px]:flex-col-reverse w-[100vw] justify-center gap-10 flex-wrap'>
      <Articles
        articles={tag ? data.post : data.posts}
        isTag={tag ? tagName : null}
      />
      <Sidebar />
    </div>
  );
}

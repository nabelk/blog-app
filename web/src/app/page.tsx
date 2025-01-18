import axios from 'axios';
import { Articles } from './component/articles';

export default async function Home() {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const { data, status } = await axios.get(
    `${NEXT_PUBLIC_API_URL}/api/post/all`
  );

  return <Articles articles={data.posts} />;
}

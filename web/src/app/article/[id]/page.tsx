import axios from 'axios';
import { format } from 'date-fns';
import { AddComment } from './component/add-comment';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Comment {
  id: number;
  createdAt: Date;
  name: string;
  comment: string;
  postId: number;
}

export default async function ArticlePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;
  const { NEXT_PUBLIC_API_URL } = process.env;
  const { data } = await axios.get(`${NEXT_PUBLIC_API_URL}/api/post/${id}`);
  const { post } = data;

  return (
    <main>
      <article key={post.id}>
        <header className='mx-4 md:mx-auto max-w-screen-md pt-28 flex flex-col justify-start'>
          <p className='text-gray-500'>
            Published {format(post.createdAt, 'MMMM dd, yyyy')}
          </p>
          <h1 className='mt-2 text-3xl font-bold text-gray-900 sm:text-5xl'>
            {post.title}
          </h1>
          <div className='mt-6 flex flex-wrap gap-2' aria-label='Tags'>
            {post.tags.map(
              (t: {
                tag: {
                  tag: string;
                  id: number;
                };
              }) => {
                const {
                  tag: { tag, id },
                } = t;

                return (
                  <div
                    key={id}
                    className='mr-2 mt-1 rounded-2xl bg-orange-500 py-1.5 px-4 text-xs text-white cursor-pointer'
                  >
                    {tag}
                  </div>
                );
              }
            )}
          </div>
        </header>

        <div className='mx-4 md:mx-auto mt-10 max-w-screen-md space-y-12 px-6 py-10 font-serif text-lg tracking-wide text-gray-700  bg-[#99B898] rounded-sm'>
          {/* <p className='whitespace-pre-line'>{post.content}</p>
           */}
          <ReactMarkdown
            className='prose prose-sm sm:prose lg:prose-lg '
            remarkPlugins={[remarkGfm]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
      <section className='w-full rounded-lg  px-6 py-10  mx-auto max-w-screen-md '>
        <h3 className='font-os text-lg font-bold mb-4'>
          Comments ({post.comments.length})
        </h3>

        <AddComment postId={post.id} apiUrl={NEXT_PUBLIC_API_URL} />

        {post.comments.map((comment: Comment) => (
          <div key={comment.id} className='mb-4'>
            <div className='ml-3'>
              <div className='font-semibold text-gray-800'>
                {comment.name}{' '}
                <small className='text-gray-600 font-normal'>
                  - Posted on {format(comment.createdAt, 'yyyy-MM-dd HH:mm')}
                </small>
              </div>

              <p className='mt-2 text-gray-700 whitespace-pre-line'>
                {comment.comment}
              </p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

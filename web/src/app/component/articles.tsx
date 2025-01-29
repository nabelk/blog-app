import Link from 'next/link';
import { format } from 'date-fns';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

export type Tags = {
  tag: {
    tag: string;
    id: number;
  };
};

interface Article {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  _count: {
    comments: number;
  };
  tags: Tags[];
}

export function Articles({
  articles,
  isTag,
}: {
  articles: Article[];
  isTag: string | null;
}) {
  return (
    <section className='py-20 pt-0 min-[1340px]:pt-28'>
      <h1 className='mb-12 text-center font-sans text-4xl font-bold'>
        {isTag ? `Posts with '${isTag}' tag` : 'Recent Posts'}
      </h1>
      <div className='mx-auto grid max-w-screen-lg grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10'>
        {articles.map((article) => {
          if (article.published)
            return (
              <article
                key={article.id}
                className='h-90 w-80 bg-[#99B898] col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg p-2 shadow-lg transition-transform duration-200 hover:translate-y-2'
              >
                <Link
                  href={`/article/${article.id}`}
                  className='block h-full w-full'
                >
                  <div className='w-full p-4'>
                    <p className='mb-2 text-xl font-bold text-gray-800'>
                      {article.title}
                    </p>

                    <ReactMarkdown
                      className='text-md font-light text-gray-700 line-clamp-3'
                      remarkPlugins={[remarkGfm]}
                    >
                      {article.content}
                    </ReactMarkdown>
                    <div className='justify-starts mt-4 flex flex-wrap items-center'>
                      {article.tags.map((t) => {
                        const {
                          tag: { tag, id },
                        } = t;

                        return (
                          <div
                            key={id}
                            className='mr-2 mt-1 rounded-2xl bg-orange-500 py-1.5 px-4 text-xs text-white'
                          >
                            {tag}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className='flex flex-wrap items-center justify-between px-6 pt-1 pb-4'>
                    <div className='flex flex-wrap text-sm text-gray-700'>
                      <span className='mr-1'>
                        {format(article.createdAt, 'MMMM dd, yyyy')}
                      </span>
                    </div>
                    <div className='mt-1'>
                      <span className='mr-3 ml-auto inline-flex items-center py-1 pr-3 text-sm leading-none text-gray-600 md:ml-0 lg:ml-auto'>
                        {article._count.comments}
                        <svg
                          className='ml-1'
                          stroke='currentColor'
                          fill='currentColor'
                          strokeWidth='0'
                          viewBox='0 0 512 512'
                          height='1em'
                          width='1em'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm16 352c0 8.8-7.2 16-16 16H288l-12.8 9.6L208 428v-60H64c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h384c8.8 0 16 7.2 16 16v288z'></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
        })}
      </div>
    </section>
  );
}

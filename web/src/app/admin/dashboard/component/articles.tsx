'use client';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

import { Data } from './admin-home';
import { Published } from './published';
import { DeletePost } from './delete-post';
import { CreatePost } from './create-post';
import { useState } from 'react';
import { EditPost } from './edit-post';

export function Articles({ posts }: Data) {
  const [articles, setArticles] = useState(posts);

  const handleArticlesState = ({
    action,
    id,
  }: {
    action: 'delete';
    id: number;
  }) => {
    switch (action) {
      case 'delete':
        setArticles((prevArticles) => {
          return prevArticles.filter((a) => a.id !== id);
        });
        break;
    }
  };

  return (
    <div className='container mx-auto max-w-screen-md p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>All Article</h2>
        <CreatePost />
      </div>

      <div className='space-y-4'>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div
              key={article.id}
              className='bg-[#99B898] shadow-md rounded-lg p-4'
            >
              <div className='flex justify-between items-start mb-4'>
                <h3 className='text-xl font-semibold text-gray-800'>
                  {article.title}
                </h3>
                <Published published={article.published} postId={article.id} />
              </div>

              <ReactMarkdown
                className='mb-4 line-clamp-3 text-gray-600'
                remarkPlugins={[remarkGfm]}
              >
                {article.content}
              </ReactMarkdown>
              {article.tags.length > 0 && (
                <>
                  <div className='flex flex-wrap space-x-2'>
                    {article.tags.map((t) => {
                      return (
                        <div key={t.tag.id}>
                          <span className='bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full'>
                            {t.tag.tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <div className='mt-4 flex justify-end space-x-4'>
                <EditPost
                  editValue={{
                    title: article.title,
                    content: article.content,
                    tag: article.tags.map((item) => item.tag.tag).join(', '),
                  }}
                  editId={article.id}
                />
                <DeletePost
                  postId={article.id}
                  postTitle={article.title}
                  handleArticlesState={handleArticlesState}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No posts</p>
        )}
      </div>
    </div>
  );
}

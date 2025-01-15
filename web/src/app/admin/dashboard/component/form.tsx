'use client';

import { useState, useRef, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../../lib/auth';

export type EditValue = { title?: string; content?: string; tag?: string };

interface FormProps {
  editValue: EditValue | null;
  formType: 'edit' | 'create';
  editId: number | null;
}

const formStatement = {
  edit: 'Edit',
  create: 'Create',
};

export function Form({ formType, editValue, editId }: FormProps) {
  const [editFormValue, setEditFormValue] = useState(editValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const token = localStorage.getItem('token');

  async function action(data: FormData): Promise<void> {
    setIsOpen(false);
    formRef?.current?.reset();
    const [title, content, tag] = [
      data.get('title'),
      data.get('content'),
      data.get('tags'),
    ];

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const submission: AxiosResponse =
        formType === 'create'
          ? await axios.post(
              `${API_URL}/admin/create-post`,
              {
                title,
                content,
                tag,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          : await axios.put(
              `${API_URL}/admin/posts/update/${editId}`,
              {
                title,
                content,
                tag,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            );
      window.location.reload();
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          formType === 'edit'
            ? 'px-3 py-1.5 bg-sky-600 text-white rounded-md hover:bg-sky-700'
            : 'rounded-md bg-slate-300 py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:text-slate-300 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'
        }
        type='button'
      >
        {formStatement[formType]} Post
      </button>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='fixed inset-0 bg-black bg-opacity-50'
            onClick={() => setIsOpen(false)}
          />

          <div className='relative bg-white rounded-lg w-full max-w-md p-6 mx-4'>
            <button
              onClick={() => setIsOpen(false)}
              className='absolute right-4 top-4 text-gray-400 hover:text-gray-600'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>

            <h2 className='text-xl font-bold mb-6'>
              {formType === 'create' ? 'Create New Post' : 'Edit Post'}
            </h2>

            <form ref={formRef} action={action} className='space-y-4'>
              <div>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  {...(formType === 'edit' && {
                    value: editFormValue?.title,
                    onChange: (e) =>
                      setEditFormValue((prevValue) => ({
                        ...prevValue,
                        title: e.target.value,
                      })),
                  })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='content'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Content
                </label>
                <textarea
                  name='content'
                  id='content'
                  rows={4}
                  {...(formType === 'edit' && {
                    value: editFormValue?.content,
                    onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
                      setEditFormValue((prevValue) => ({
                        ...prevValue,
                        content: e.target.value,
                      })),
                  })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='tags'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Tags
                </label>
                <input
                  type='text'
                  name='tags'
                  id='tags'
                  {...(formType === 'edit' && {
                    value: editFormValue?.tag,
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                      setEditFormValue((prevValue) => ({
                        ...prevValue,
                        tag: e.target.value,
                      })),
                  })}
                  placeholder='technology, news, tutorial'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500'
                />
              </div>

              <div className='flex justify-end space-x-2 mt-6'>
                <button
                  type='button'
                  onClick={() => setIsOpen(false)}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500'
                >
                  {formStatement[formType]} Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

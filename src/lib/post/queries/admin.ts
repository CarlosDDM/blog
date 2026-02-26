import { postRepository } from '@/repositories/post';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findPostByIdAdmin = cache((id: string) => {
  return unstable_cache(
    async (id: string) => {
      const post = await postRepository.findById(id).catch(() => undefined);

      if (!post) return notFound();

      return post;
    },
    [`find-${id}`],
    {
      tags: [`find-${id}`],
    },
  )(id);
});

export const findAllPostAdmin = cache(
  unstable_cache(
    async () => {
      return await postRepository.findAll();
    },
    ['find-all-admin'],
    {
      tags: ['find-all-admin'],
    },
  ),
);

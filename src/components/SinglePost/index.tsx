import { findPostBySlugCached } from '@/lib/post/queries';
import Image from 'next/image';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';
import { SafeMarkdown } from '../SafeMarkdown';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugCached(slug);
  return (
    <article className='mb-6 group'>
      <header className='flex flex-col gap-4 mb-4'>
        <Image
          className='rounded-xl'
          src={post.coverImageUrl}
          alt={post.title}
          width={1200}
          height={720}
          priority
        />
        <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>
        <p>
          {post.author} | <PostDate dateString={post.createdAt} />
        </p>
      </header>
      <p className='mb-4 text-lg lg:text-2xl'>{post.excerpt}</p>

      <SafeMarkdown markdown={post.content} />
    </article>
  );
}

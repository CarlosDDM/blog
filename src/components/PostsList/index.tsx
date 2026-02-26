import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPostsCached } from '@/lib/post/queries/public';
import clsx from 'clsx';

export async function PostsList() {
  const posts = await findAllPublicPostsCached();
  if (posts.length <= 0) return null;
  return (
    <div
      className={clsx(
        'grid',
        'grid-cols-1',
        'gap-8',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
        'mb-16',
      )}
    >
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div
            className={clsx('flex', 'gap-4', 'flex-col', 'group')}
            key={post.id}
          >
            <PostCoverImage
              linkProps={{ href: postLink }}
              imageProps={{
                src: `${post.coverImageUrl}`,
                width: 1200,
                height: 720,
                alt: `Capa do post ${post.title}`,
              }}
            />
            <PostSummary
              createdAt={post.createdAt}
              title={post.title}
              excerpt={post.excerpt}
              postLink={postLink}
              postHeading='h2'
            />
          </div>
        );
      })}
    </div>
  );
}

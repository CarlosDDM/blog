import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPostsCached } from '@/lib/post/queries';
import clsx from 'clsx';

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();
  const post = posts[0];
  const slug = post.slug;
  const postLink = `/post/${slug}`;
  return (
    <>
      <section
        className={clsx(
          'grid',
          'grid-cols-1',
          'gap-8',
          'mb-16',
          'sm:grid-cols-2',
          'group',
        )}
      >
        <PostCoverImage
          linkProps={{ href: postLink }}
          imageProps={{
            src: post.coverImageUrl,
            width: 1200,
            height: 720,
            alt: `Capa do post ${post.title}`,
            priority: true,
          }}
        />

        <PostSummary
          createdAt={post.createdAt}
          title={post.title}
          excerpt={post.excerpt}
          postLink={postLink}
          postHeading='h1'
        />
      </section>
    </>
  );
}

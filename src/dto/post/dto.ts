import { PostModel } from '@/models/posts/post-model';

export const makePartialPublicPost = (
  post?: Partial<PostModel>,
): PublicPost => {
  return {
    id: post?.id || '',
    author: post?.author || '',
    content: post?.content || '',
    coverImageUrl: post?.coverImageUrl || '',
    createdAt: post?.createdAt || '',
    excerpt: post?.excerpt || '',
    published: post?.published || false,
    slug: post?.slug || '',
    title: post?.title || '',
  };
};

export type PublicPost = Omit<PostModel, 'updatedAt'>;
export const makePublicPostFromDb = (post: PostModel): PublicPost => {
  return makePartialPublicPost(post);
};

import { PostHeading } from '../PostHeading';
import clsx from 'clsx';
import { PostDate } from '../PostDate';

type PostSummaryProps = {
  postHeading: 'h1' | 'h2';
  postLink: string;
  createdAt: string;
  title: string;
  excerpt: string;
};
export function PostSummary({
  postHeading,
  postLink,
  createdAt,
  title,
  excerpt,
}: PostSummaryProps) {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'justify-center',
        'gap-4',
        'sm:justify-center',
      )}
    >
      <PostDate dateString={createdAt} />
      <PostHeading url={postLink} as={postHeading}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
}

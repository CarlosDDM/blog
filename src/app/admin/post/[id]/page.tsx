export const dynamic = 'force-dynamic';

type AdminPostPageIdProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPostIdPage({
  params,
}: AdminPostPageIdProps) {
  const { id } = await params;
  return <div>AdminPostIdPage {id}</div>;
}

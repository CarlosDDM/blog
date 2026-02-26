import { MenuAdmin } from '@/components/admin/MenuAdmin';
import { requireLoginSessionOrRedirect } from '@/lib/login/manage-login';

type RootLayoutProps = {
  children: React.ReactNode;
};
export default async function AdminPostLayout({
  children,
}: Readonly<RootLayoutProps>) {
  await requireLoginSessionOrRedirect();

  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}

import { SignupForm } from '@/components/admin/SingupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign - up',
};

export default function SignupPage() {
  return <SignupForm />;
}

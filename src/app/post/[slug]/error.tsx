'use client';
import ErrorMessage from '@/components/ErrorMessage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Error - Post',
  description: 'An error occurred while loading the post.',
};
export default function SlugRouteErrorPage() {
  return (
    <ErrorMessage
      contentTitle='Error'
      content='An error occurred while loading the post.'
    />
  );
}

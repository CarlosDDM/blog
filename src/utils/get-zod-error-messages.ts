import { ZodError } from 'zod';

export function getZodErrorMessages<T>(error: ZodError<T>): string[] {
  return error.issues.map(issue => issue.message);
}

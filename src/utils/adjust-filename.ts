import { v4 as uuidV4 } from 'uuid';
import path from 'path';

export function adjustFileName(originalFileName: string): string {
  const date = Date.now();
  const uuid = uuidV4().replace(/-/g, '');
  const extension = path.extname(originalFileName).toLowerCase();

  const newName = `${date}-${uuid}${extension}`;
  return newName;
}

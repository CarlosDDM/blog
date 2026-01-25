import { formatDateToNow, formateDateTime } from '@/utils/format-datetime';
import clsx from 'clsx';

type PostDateProps = {
  dateString: string;
};
export function PostDate({ dateString }: PostDateProps) {
  return (
    <time
      className={clsx('text-sm/tight', 'text-gray-600')}
      dateTime={dateString}
      title={formatDateToNow(dateString)}
    >
      {formateDateTime(dateString)}
    </time>
  );
}

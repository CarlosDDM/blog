import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = {
  labelText?: string;
  type?: 'checkbox';
} & React.ComponentProps<'input'>;

export function InputCheckBox({
  type = 'checkbox',
  labelText = '',
  ...props
}: InputTextProps) {
  const id = useId();

  return (
    <div className='flex gap-3 items-center'>
      <input
        className={clsx(
          'w-4 h-4',
          props.className,
          'outline-none',
          'focus:ring-2',
          'focus:ring-blue-500',
        )}
        type={type}
        {...props}
        id={id}
      />

      {labelText && (
        <label className='text-base' htmlFor={id}>
          {labelText}
        </label>
      )}
    </div>
  );
}

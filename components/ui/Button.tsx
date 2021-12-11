import { spawn } from 'child_process';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { CgSpinner } from 'react-icons/cg';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
  loading?: boolean;
}
export default function Button({
  children,
  loading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={
        'bg-green-600 px-4 py-2 hover:bg-green-700 rounded mt-2 text-white flex items-center gap-1 ' +
        (loading ? 'opacity-50 cursor-not-allowed' : '')
      }
      disabled={loading || props.disabled}
      {...props}>
      {loading ? (
        <span className='animate-spin text-xl'>
          <CgSpinner></CgSpinner>
        </span>
      ) : (
        ''
      )}
      {children}
    </button>
  );
}

import { cn } from '@/utils';
import type { ComponentPropsWithRef } from 'react';

type ButtonProps = ComponentPropsWithRef<'button'> & {
  intent?: 'primary' | 'secondary';
};

export function Button({ intent = 'primary', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
        {
          'bg-orange-400 text-orange-950 hover:bg-orange-500': intent === 'primary',
          'bg-zinc-800 text-zinc-300 hover:bg-zinc-700': intent === 'secondary',
        },
      )}
    >
      {props.children}
    </button>
  );
}

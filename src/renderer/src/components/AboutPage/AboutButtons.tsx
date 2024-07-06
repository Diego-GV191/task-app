import { twMerge } from 'tailwind-merge'
import { AboutButtonProps } from '@renderer/components'

export const AboutButtons = ({ title, className, onClick }: AboutButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'w-full text-xl',
        'dark:bg-gray-700 dark:text-zinc-200 text-zinc-800 bg-gray-300',
        'rounded-lg p-2 my-1',
        'hover:bg-slate-500/50',
        'text-start',
        className,
      )}
    >
      {title}
    </button>
  )
}

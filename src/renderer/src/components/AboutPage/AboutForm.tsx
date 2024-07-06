import { twMerge } from 'tailwind-merge'
import { AboutFormsProps } from '@renderer/components'

export const AboutForm = ({ children, className }: AboutFormsProps) => {
  return (
    <div
      className={twMerge(
        className,
        'w-full h-full',
        'rounded-3xl',
        'bg-slate-100 dark:bg-slate-600',
        'flex justify-center items-center',
        '',
      )}
    >
      {children}
    </div>
  )
}

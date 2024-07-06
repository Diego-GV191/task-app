import { twMerge } from 'tailwind-merge'
import { ToastCustomEnum, ToastProps } from '@renderer/components'
import { useEffect, useState } from 'react'
import { MdErrorOutline, MdCheck } from 'react-icons/md'

export const Toast = ({ t, body, status, title }: ToastProps) => {
  const [anim, setAnim] = useState<boolean>(false)

  useEffect(() => {
    let timer
    if (t?.visible) {
      timer = setTimeout(() => {
        setAnim(true)
      }, 100)
    }
    return () => {
      setAnim(false)
      clearTimeout(timer)
    }
  }, [t?.visible])

  return (
    <div
      className={twMerge(
        anim ? 'top-4' : '-top-36',
        'max-w-md w-full bg-neutral-100/75 dark:bg-neutral-700/75 backdrop-blur-sm shadow-lg rounded-2xl flex',
        'p-2 flex items-center duration-200 absolute',
      )}
      style={{ zIndex: 9999999 }}
    >
      <span
        className={twMerge(
          status === ToastCustomEnum.error && 'bg-red-600/90',
          status === ToastCustomEnum.success && 'bg-green-600/90',
          'h-14 w-16 flex justify-center items-center rounded-full',
        )}
      >
        {status === ToastCustomEnum.error && <MdErrorOutline className="h-10 w-12" />}
        {status === ToastCustomEnum.success && <MdCheck className="h-10 w-12" />}
      </span>
      <div
        className={twMerge(
          'bg-zinc-200 dark:bg-zinc-800 p-2 dark:text-zinc-100',
          'rounded-2xl w-full ml-3 text-lg',
        )}
      >
        <div className="text-lg border-b-gray-600 border-b-2">{title}</div>
        <div className={twMerge('whitespace-pre-wraps', 'text-base')}>{body}</div>
      </div>
    </div>
  )
}

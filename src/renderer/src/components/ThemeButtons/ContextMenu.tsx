import { twMerge } from 'tailwind-merge'
import { useThemeContext } from '@renderer/components'
import { useEffect, useState } from 'react'

export const ContextMenu = () => {
  const { handleChangeTheme, handleThemeSystem, contextMenu, setContextMenu } = useThemeContext()
  const [animationClassDiv, setAnimationClassDiv] = useState('-right-40 bg-transparent')
  const [animationClassButton, setAnimationClassButton] = useState('bg-transparent')

  useEffect(() => {
    let timeout1, timeout2
    const time = 100

    if (contextMenu) {
      timeout1 = setTimeout(() => {
        setAnimationClassDiv('right-4 bg-slate-700 dark:bg-slate-300')
      }, time)

      timeout2 = setTimeout(() => {
        setAnimationClassButton('bg-slate-500/50')
      }, time)
    } else {
      setAnimationClassDiv('-right-40')
      setAnimationClassButton('bg-transparent')
    }

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    }
  }, [contextMenu])

  return (
    <div
      className={twMerge(
        animationClassDiv,
        'text-zinc-200 dark:text-zinc-800',
        'fixed bottom-24 p-2 rounded-xl duration-200',
        'flex flex-col',
      )}
    >
      <button
        onClick={() => {
          handleChangeTheme()
          setContextMenu(!contextMenu)
        }}
        className={twMerge(animationClassButton, 'rounded-xl p-2 mb-1', 'hover:bg-slate-500/75')}
      >
        Claro / Oscuro
      </button>
      <button
        onClick={() => {
          handleThemeSystem()
          setContextMenu(!contextMenu)
        }}
        className={twMerge(animationClassButton, 'rounded-xl p-2 mb-1', 'hover:bg-slate-500/75')}
      >
        Sistema
      </button>
    </div>
  )
}

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const Versions = () => {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul className="flex flex-wrap">
      <li
        className={twMerge(
          'duration-200',
          'hover:scale-125 hover:shadow-lg',
          'm-10 p-5 rounded-xl',
          'bg-zinc-300/50',
        )}
      >
        Electron v{versions.electron}
      </li>
      <li
        className={twMerge(
          'duration-200',
          'hover:scale-125 hover:shadow-lg',
          'm-10 p-5 rounded-xl',
          'bg-zinc-300/50',
        )}
      >
        Chromium v{versions.chrome}
      </li>
      <li
        className={twMerge(
          'duration-200',
          'hover:scale-125 hover:shadow-lg',
          'm-10 p-5 rounded-xl',
          'bg-zinc-300/50',
        )}
      >
        Node v{versions.node}
      </li>
    </ul>
  )
}

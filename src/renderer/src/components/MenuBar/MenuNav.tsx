import { forwardRef, useState } from 'react'
import { MenuNavProps } from '@renderer/components/MenuBar'

export const MenuNav = forwardRef<HTMLButtonElement, MenuNavProps>(
  (
    { title, onClick, subMenu, position = { top: 0, left: 0 }, onMouseEnter }: MenuNavProps,
    ref,
  ) => {
    const [showOptions, setShowOptions] = useState<boolean>(false)

    return (
      <>
        <button
          ref={ref}
          className="text-base font-medium text-zinc-700 dark:text-zinc-400 py-2"
          onClick={(event) => {
            if (onClick) {
              onClick(event)
            } else if (subMenu) {
              setShowOptions(!showOptions)
            }
          }}
          onMouseEnter={(event) => {
            setShowOptions(true)
            if (onMouseEnter) onMouseEnter(event)
          }}
          onMouseLeave={() => {
            setShowOptions(false)
          }}
        >
          <span className="rounded-lg px-2 py-1 hover:bg-zinc-200 hover:dark:bg-slate-800">
            {title}
          </span>
        </button>
        {subMenu && showOptions && (
          <div
            onMouseEnter={() => {
              setShowOptions(true)
            }}
            onMouseLeave={() => {
              setShowOptions(false)
            }}
            className="absolute w-52 top-10 left-2 text-zinc-200 bg-gray-800 p-1 border border-zinc-600 text-lg"
            style={{ top: position.top + 30, left: position.left }}
          >
            <ul>
              {subMenu.map((item) => (
                <li className="hover:bg-slate-400/50 rounded-md" key={item.label}>
                  <button
                    className="px-1 text-left w-full flex flex-nowrap justify-between"
                    onClick={item.subClick}
                  >
                    {item.label}
                    <span className="text-nowrap px-1 text-zinc-400">{item.shortcut}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  },
)

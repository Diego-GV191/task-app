import { useBaseContext } from '@renderer/App'
import { MenuNav, useAppContext } from '@renderer/components'
import { useEffect, useRef, useState } from 'react'

export const Nav = () => {
  const { handleSave, handleOpenFile } = useAppContext()
  const { handleProgressTask } = useBaseContext()
  const [positions, setPositions] = useState<{ [key: number]: { top: number; left: number } }>({})
  const buttonRefs = useRef<HTMLButtonElement[]>([])

  const handlePosition = (index: number) => {
    if (buttonRefs.current[index]) {
      const rect = buttonRefs.current[index].getBoundingClientRect()
      setPositions((prev) => ({
        ...prev,
        [index]: { top: rect.top, left: rect.left },
      }))
    }
  }

  useEffect(() => {
    const newPositions: { [key: number]: { top: number; left: number } } = {}

    buttonRefs.current.forEach((button, index) => {
      const rect = button.getBoundingClientRect()
      newPositions[index] = { top: rect.top, left: rect.left }
    })

    setPositions(newPositions)
  }, [])

  return (
    <div className="w-screen min-w-full h-10 shadow-lg bg-slate-400/75 dark:bg-slate-950/75 fixed flex justify-start flex-nowrap backdrop-blur-md z-50">
      <MenuNav
        position={positions[0] || { top: 0, left: 0 }}
        title="File"
        onMouseEnter={() => {
          handlePosition(0)
        }}
        subMenu={[
          { label: 'Save', subClick: () => handleSave(), shortcut: 'Ctrl + S' },
          { label: 'Open', subClick: () => handleOpenFile(), shortcut: 'Ctrl + O' },
        ]}
        ref={(el) => {
          if (el) {
            buttonRefs.current[0] = el
          }
        }}
      />

      <MenuNav
        title="Github"
        onClick={() => {
          window.open('https://github.com/Diego-GV191/task-app')
        }}
      />

      <MenuNav title="Config" onClick={() => handleProgressTask()} />
    </div>
  )
}

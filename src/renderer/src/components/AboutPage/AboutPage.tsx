import { useState, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { MdAutoAwesomeMosaic } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { AboutAPP, AboutButtons, AboutForm, Versions } from '@renderer/components'
import { useBaseContext } from '@renderer/App'

export const AboutPage = () => {
  const { handleProgressTask } = useBaseContext()
  const [porcent, setPorcent] = useState({ min: 15, max: 80 })
  const [width, setWidth] = useState<number>(20)
  const [isResize, setIsResize] = useState<boolean>(false)
  const [openForm, setOpenForm] = useState<string>('')
  const isDragging = useRef<boolean>(false)
  const divRef = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setPorcent({ min: 15, max: 80 })
    isDragging.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    setIsResize(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      const widthCursor = (e.clientX / window.screen.availWidth) * 100
      if (widthCursor > porcent.min && widthCursor < porcent.max) setWidth(widthCursor)
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    setIsResize(false)
  }

  return (
    <div
      ref={divRef}
      className={twMerge(
        isResize ? 'cursor-ew-resize' : 'cursor-default',
        'w-full h-full min-h-screen flex flex-row flex-nowrap pt-10',
        'bg-slate-200/50 dark:bg-slate-800/50',
      )}
    >
      <div
        ref={div2Ref}
        className={twMerge(`w-[${width}%]`, 'bg-slate-100 dark:bg-slate-900', 'flex flex-nowrap')}
        style={{ width: `${width}%` }}
      >
        <div className="p-3 w-full">
          <AboutButtons title="Acerca de" onClick={() => setOpenForm('about')} />
          <AboutButtons title="Versiones" onClick={() => setOpenForm('versions')} />
        </div>

        <div
          onMouseDown={handleMouseDown}
          className={twMerge(
            'hover:cursor-w-resize',
            'hover:bg-gray-600 bg-gray-600',
            'rounded-full w-1',
          )}
        />
      </div>
      <div
        className={twMerge(
          `w-[${100 - width}]`,
          'flex justify-center items-center',
          'bg-slate-200 dark:bg-slate-800 p-10',
        )}
        style={{ width: `${100 - width}%` }}
      >
        <IoMdClose
          onClick={handleProgressTask}
          className="bg-slate-400/50 hover:bg-slate-400/75 rounded-3xl absolute top-20 right-10 p-2 h-20 w-20"
        />
        <AboutForm>
          {openForm === 'versions' ? (
            <Versions />
          ) : openForm === 'about' ? (
            <AboutAPP />
          ) : (
            <MdAutoAwesomeMosaic className={twMerge('text-slate-950/50', 'h-96 w-96')} />
          )}
        </AboutForm>
      </div>
    </div>
  )
}

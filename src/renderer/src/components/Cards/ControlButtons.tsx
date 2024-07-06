import { IoMdAdd } from 'react-icons/io'
import { AiOutlineClear } from 'react-icons/ai'
import { useAppContext } from '@renderer/components'

export const ControlButtons = () => {
  const { handlePopUp, handleClearTasks } = useAppContext()
  return (
    <div className="flex flex-wrap">
      <div
        onClick={handlePopUp}
        className="h-fit text-6xl hover:bg-neutral-400/50 dark:text-zinc-900 text-zinc-300 dark:bg-neutral-200/50 bg-neutral-800/50 rounded-lg m-1"
      >
        <IoMdAdd className="cursor-pointer" />
      </div>
      <div
        onClick={handleClearTasks}
        className="h-fit text-6xl hover:bg-neutral-400/50 dark:text-zinc-900 text-zinc-300 dark:bg-neutral-200/50 bg-neutral-800/50 rounded-lg m-1"
      >
        <AiOutlineClear className="cursor-pointer" />
      </div>
    </div>
  )
}

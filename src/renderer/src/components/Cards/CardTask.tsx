import { MdArrowForwardIos, MdArrowBackIos, MdDelete } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { CardTaskProps } from '@renderer/components/Cards/utils'
import { useCardsContext } from '@renderer/components'

export const CardTask = ({
  backColor,
  title,
  body,
  isdraggable,
  onDragStart,
  onDelete,
  next,
  prev,
  showTitle,
}: CardTaskProps) => {
  const { showText } = useCardsContext()

  return (
    <div
      className={twMerge(
        backColor,
        'w-fit h-fit m-4 rounded-2xl flex flex-col max-w-80 cursor-pointer',
      )}
      draggable={isdraggable}
      onDragStart={onDragStart}
    >
      <div
        onClick={showTitle}
        className="p-2 flex flex-row flex-nowrap justify-between items-center cursor-default"
      >
        <strong
          className={twMerge(
            showText ? 'whitespace-pre-wraps' : 'whitespace-nowrap',
            'text-2xl overflow-hidden text-ellipsis',
            '',
          )}
        >
          {title}
        </strong>
        <div className="flex flex-nowrap flex-row items-center">
          <button className="mr-1">
            <MdDelete className="text-xl" onClick={onDelete} />
          </button>
          <button className="mr-1" onClick={prev}>
            <MdArrowBackIos />
          </button>
          <button onClick={next}>
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
      <span className="whitespace-pre-wrap h-full bg-slate-200 text-neutral-900 rounded-2xl p-4">
        {body}
      </span>
    </div>
  )
}

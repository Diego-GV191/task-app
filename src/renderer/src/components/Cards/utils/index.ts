import { ReactEventHandler } from 'react'

export const enum BackColorsEnum {
  green = 'bg-green-400',
  red = 'bg-red-400',
  yellow = 'bg-yellow-400',
}

export type CardTaskProps = {
  backColor: BackColorsEnum
  title: string
  body: string
  onDragStart: ReactEventHandler
  isdraggable: boolean
  next: ReactEventHandler
  prev: ReactEventHandler
  onDelete: ReactEventHandler
  showTitle?: ReactEventHandler
}

import { ReactElement, ReactEventHandler } from 'react'

export interface AboutButtonProps {
  title: string
  className?: string
  onClick?: ReactEventHandler
}

export interface AboutFormsProps {
  className?: string
  children?: ReactElement
}

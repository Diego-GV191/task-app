import React from 'react'

type subMenu = {
  label: string
  subClick?: React.MouseEventHandler<HTMLButtonElement>
  shortcut?: string
}

type position = {
  top: number
  left: number
}

export type MenuNavProps = {
  title: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  subMenu?: subMenu[]
  ref?: React.LegacyRef<HTMLButtonElement>
  position?: position
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>
}

import { twMerge } from 'tailwind-merge'
import { BackRadioColorsChecked, BackRadioColors, useFormContext } from '@renderer/components'

export const RadioButtonsWithCheckbox = () => {
  const { selected, setSelected } = useFormContext()

  return (
    <div className="min-h-fit p-2 flex flex-wrap justify-evenly items-center mb-4">
      <div
        className={twMerge(
          selected === 1 ? BackRadioColorsChecked.red : BackRadioColors.red,
          selected === 1 ? 'scale-125 font-semibold duration-75' : 'scale-100',
          'cursor-pointer mx-7 select-none rounded-lg',
        )}
        onClick={() => {
          setSelected(1)
        }}
      >
        <h1 className={twMerge('p-2 text-3xl')}>Por hacer</h1>
      </div>
      <div
        className={twMerge(
          selected === 2 ? BackRadioColorsChecked.yellow : BackRadioColors.yellow,
          selected === 2 ? 'scale-125 shadow-lg font-semibold duration-75' : 'scale-100',
          'cursor-pointer mx-7 select-none rounded-lg',
        )}
        onClick={() => {
          setSelected(2)
        }}
      >
        <h1 className={twMerge('p-2 text-3xl')}>En progreso</h1>
      </div>
      <div
        className={twMerge(
          selected === 3 ? BackRadioColorsChecked.green : BackRadioColors.green,
          selected === 3 ? 'scale-125 shadow-lg font-semibold duration-75' : 'scale-100',
          'cursor-pointer mx-7 select-none rounded-lg',
        )}
        onClick={() => {
          setSelected(3)
        }}
      >
        <h1 className={twMerge('p-2 text-3xl')}>Terminada</h1>
      </div>
    </div>
  )
}

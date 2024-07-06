import { CardTask, ControlButtons, useAppContext } from '@renderer/components'
import { BackColorsEnum } from '@renderer/components/Cards/utils'
import { createContext, useContext, useState } from 'react'

interface CardsContextType {
  showText: boolean
}

const CardsDefaultValue: CardsContextType = {
  showText: false,
}

const CardsContext = createContext<CardsContextType>(CardsDefaultValue)

export const useCardsContext = () => useContext(CardsContext)

export const ProgressTask = () => {
  const { tasks, setTasks } = useAppContext()
  const [showText, setShowText] = useState<boolean>(false)

  const getList = (list) => {
    return tasks.filter((item) => item.list === list)
  }

  const startDrag = (ev, item) => {
    ev.dataTransfer.setData('itemID', item.id)
  }

  const DraggingOver = (ev) => {
    ev.preventDefault()
  }

  const onDrop = (ev, list) => {
    ev.preventDefault()
    const itemID = ev.dataTransfer.getData('itemID')
    const item = tasks.find((item) => item.id == itemID)
    if (!item?.list) return
    item.list = list

    const newState = tasks.map((task) => {
      if (task.id === itemID) return item
      return task
    })

    setTasks(newState)
  }

  const changeList = (ev, item, list) => {
    ev.preventDefault()
    if (list < 0) return
    if (list > 3) return

    const updatedItem = { ...item, list }

    const newState = tasks.map((task) => {
      if (task.id === item.id) return updatedItem
      return task
    })

    setTasks(newState)
  }

  const deleteTask = (ev, id) => {
    ev.preventDefault()
    const newTasks = tasks.filter((item) => item.id !== id)
    setTasks(newTasks)
  }

  return (
    <>
      <CardsContext.Provider value={{ showText }}>
        <div className="bg-slate-500/50 dark:bg-slate-700/50 p-4 rounded-2xl m-8 w-full flex flex-col justify-around mt-20 select-none">
          <div className="flex justify-center mb-6">
            <ControlButtons />
          </div>
          <div className="flex flex-wrap justify-evenly border-t-gray-600/50 border-t-4 pt-2">
            <div onDragOver={DraggingOver} onDrop={(ev) => onDrop(ev, 1)}>
              <h1 className="bg-slate-200 p-1 rounded-md min-w-full text-center font-medium text-2xl">
                Tareas por hacer
              </h1>
              {getList(1).map((item) => (
                <CardTask
                  showTitle={() => setShowText(!showText)}
                  onDelete={(ev) => deleteTask(ev, item.id)}
                  next={(ev) => changeList(ev, item, item.list + 1)}
                  prev={(ev) => changeList(ev, item, item.list - 1)}
                  isdraggable
                  onDragStart={(ev) => startDrag(ev, item)}
                  key={item.id}
                  title={item.title}
                  body={item.body}
                  backColor={BackColorsEnum.red}
                />
              ))}
            </div>

            <div className="w-0 xl:border-2 border-gray-800/25 dark:border-gray-200/25" />

            <div onDragOver={DraggingOver} onDrop={(ev) => onDrop(ev, 2)}>
              <h1 className="bg-slate-200 p-1 rounded-md min-w-full text-center font-medium text-2xl">
                Tareas en proceso
              </h1>
              {getList(2).map((item) => (
                <CardTask
                  showTitle={() => setShowText(!showText)}
                  onDelete={(ev) => deleteTask(ev, item.id)}
                  next={(ev) => changeList(ev, item, item.list + 1)}
                  prev={(ev) => changeList(ev, item, item.list - 1)}
                  isdraggable
                  onDragStart={(ev) => startDrag(ev, item)}
                  key={item.id}
                  title={item.title}
                  body={item.body}
                  backColor={BackColorsEnum.yellow}
                />
              ))}
            </div>

            <div className="w-0 xl:border-2 border-gray-800/25 dark:border-gray-200/25" />

            <div onDragOver={DraggingOver} onDrop={(ev) => onDrop(ev, 3)}>
              <h1 className="bg-slate-200 p-1 rounded-md min-w-full text-center font-medium text-2xl">
                Tareas terminadas
              </h1>
              {getList(3).map((item) => (
                <CardTask
                  showTitle={() => setShowText(!showText)}
                  onDelete={(ev) => deleteTask(ev, item.id)}
                  next={(ev) => changeList(ev, item, item.list + 1)}
                  prev={(ev) => changeList(ev, item, item.list - 1)}
                  isdraggable
                  onDragStart={(ev) => startDrag(ev, item)}
                  key={item.id}
                  title={item.title}
                  body={item.body}
                  backColor={BackColorsEnum.green}
                />
              ))}
            </div>
          </div>
        </div>
      </CardsContext.Provider>
    </>
  )
}

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Toast, ToastCustomEnum } from '@renderer/components'

interface AppContextType {
  tasks: any[]
  setTasks: React.Dispatch<React.SetStateAction<any[]>>
  handleSave: () => void
  handleOpenFile: () => void
  handlePopUp: () => void
  showPopUp: any
  setShowPopUp: React.Dispatch<React.SetStateAction<any>>
  nowId: number
  setNowId: React.Dispatch<React.SetStateAction<any>>
  handleClearTasks: () => void
  showAboutPage: boolean
  setShowAboutPage: React.Dispatch<React.SetStateAction<any>>
  handleShowAboutPage: () => void
}

const defaultValue: AppContextType = {
  tasks: [],
  setTasks: () => {},
  handleSave: () => {},
  handleOpenFile: () => {},
  handlePopUp: () => {},
  showPopUp: false,
  setShowPopUp: () => {},
  nowId: 0,
  setNowId: () => {},
  handleClearTasks: () => {},
  showAboutPage: false,
  setShowAboutPage: () => {},
  handleShowAboutPage: () => {},
}

const AppContext = createContext<AppContextType>(defaultValue)

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState<any>([])
  const [showPopUp, setShowPopUp] = useState<boolean>(false)
  const [showAboutPage, setShowAboutPage] = useState<boolean>(false)
  const [nowId, setNowId] = useState<number>(0)
  const taskRef = useRef(tasks)

  useEffect(() => {
    taskRef.current = tasks
  }, [tasks])

  const handleClearTasks = () => {
    setTasks([])
  }

  const handleShowAboutPage = () => {
    setShowAboutPage(!showAboutPage)
  }

  const handlePopUp = () => {
    setShowPopUp(!showPopUp)
  }

  const handleSave = async () => {
    try {
      const filePath = await window.api.saveFile(taskRef.current)
      if (filePath) {
        toast.custom(
          (t) => (
            <Toast
              t={t}
              title="Guardado"
              body={`Archivo guardado en: ${filePath}`}
              status={ToastCustomEnum.success}
            />
          ),
          { duration: 2000 },
        )
      } else {
        toast.custom(
          (t) => (
            <Toast
              t={t}
              title="Error al guardar"
              body="Guardado cancelado"
              status={ToastCustomEnum.error}
            />
          ),
          { duration: 2000 },
        )
      }
    } catch (error) {
      console.error('Error al guardar el archivo:', error)
      alert('Ocurrió un error al guardar el archivo')
    }
  }

  const handleOpenFile = async () => {
    try {
      const fileContent = await window.api.onOpenFile()
      if (fileContent) {
        const parsedTasks = JSON.parse(fileContent)
        setTasks(parsedTasks)
        const lastTaskId = parsedTasks.reduce((maxId, task) => Math.max(maxId, task.id), 0)
        setNowId(lastTaskId)
      }
    } catch (error) {
      console.error('Error al abrir el archivo:', error)
      alert('Ocurrió un error al abrir el archivo')
    }
  }

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        handleSave,
        handleOpenFile,
        handlePopUp,
        showPopUp,
        setShowPopUp,
        nowId,
        setNowId,
        handleClearTasks,
        handleShowAboutPage,
        showAboutPage,
        setShowAboutPage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

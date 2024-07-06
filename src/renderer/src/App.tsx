import {
  AboutPage,
  Form,
  Nav,
  ProgressTask,
  ThemeButton,
  useAppContext,
} from '@renderer/components'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

interface BaseType {
  isProgressTask: boolean
  setIsProgressTask: React.Dispatch<React.SetStateAction<any>>
  handleProgressTask: () => void
}

const defaultValue: BaseType = {
  isProgressTask: false,
  setIsProgressTask: () => {},
  handleProgressTask: () => {},
}

const BaseContext = createContext<BaseType>(defaultValue)

export const useBaseContext = () => useContext(BaseContext)

function App(): JSX.Element {
  const { showPopUp, handleSave, handleOpenFile } = useAppContext()
  const [isProgressTask, setIsProgressTask] = useState<boolean>(true)

  const handleProgressTask = () => {
    setIsProgressTask(!isProgressTask)
  }

  useEffect(() => {
    const handleKeyDown = (ev) => {
      if (ev.ctrlKey && ev.key === 's') {
        ev.preventDefault()
        handleSave()
      }
      if (ev.ctrlKey && ev.key === 'o') {
        ev.preventDefault()
        handleOpenFile()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <BaseContext.Provider value={{ isProgressTask, setIsProgressTask, handleProgressTask }}>
        <Nav />
        <div className="min-h-screen h-full bg-slate-100 dark:bg-slate-900 flex flex-col sm:flex-row flex-wrap justify-center items-start select-none">
          {isProgressTask ? <ProgressTask /> : <AboutPage />}
          {showPopUp && <Form />}
        </div>
        <ThemeButton />
        <Toaster position="top-center" />
      </BaseContext.Provider>
    </>
  )
}

export default App

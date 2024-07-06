import { RadioButtonsWithCheckbox, useAppContext } from '@renderer/components'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

interface ErrorState {
  inputError?: ErrorDetails
  textAreaError?: ErrorDetails
  radioButtonError?: ErrorDetails
}

interface ErrorDetails {
  message: string
  code?: number
}

const ErrorDefaults: ErrorState = {
  inputError: { message: '', code: 0 },
  textAreaError: { message: '', code: 0 },
  radioButtonError: { message: '', code: 0 },
}

interface FormContextType {
  selected: number
  setSelected: React.Dispatch<React.SetStateAction<any>>
}

const FormDefaultValue: FormContextType = {
  selected: 0,
  setSelected: () => {},
}

const FormContext = createContext<FormContextType>(FormDefaultValue)

export const useFormContext = () => useContext(FormContext)

export const Form = () => {
  const { handlePopUp, tasks, setTasks, nowId, setNowId } = useAppContext()
  const [selected, setSelected] = useState<number>(1)
  const [error, setError] = useState<ErrorState>(ErrorDefaults)
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const validateInput = () => {
    if (inputRef.current?.value.length === 0) {
      setError((prevErrors) => ({
        ...prevErrors,
        inputError: { message: 'Coloca nombre de la tarea' },
      }))
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        inputError: { message: '' },
      }))
    }
  }

  const validateTextarea = () => {
    if (textareaRef.current?.value.length === 0) {
      setError((prevErrors) => ({
        ...prevErrors,
        textAreaError: { message: 'Coloca la tarea' },
      }))
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        textAreaError: { message: '' },
      }))
    }
  }

  const addTask = () => {
    if (!inputRef.current || !textareaRef.current) return

    validateInput()
    validateTextarea()

    if (inputRef.current.value.length === 0 || textareaRef.current.value.length === 0) {
      return
    }

    const newTask = {
      id: nowId + 1,
      title: inputRef.current.value,
      body: textareaRef.current.value,
      list: selected,
    }
    setTasks((prev) => [...prev, newTask])
    handlePopUp()
  }

  useEffect(() => {
    const lastTaskId = tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0)
    setNowId(lastTaskId)
  }, [tasks])

  return (
    <div className="min-h-screen h-full flex justify-center items-center absolute m-auto w-full bg-gray-800/90 top-0 left-0">
      <div className="text-zinc-900 dark:text-zinc-200 bg-slate-200 dark:bg-slate-700 rounded-3xl">
        <div className="flex flex-wrap justify-between p-5 bg-slate-500/50 rounded-t-3xl select-none">
          <h1 className="text-5xl">Nueva tarea</h1>
          <div className="flex flex-wrap h-full">
            <MdAdd
              className="ml-1 h-full text-5xl bg-slate-300/50 hover:bg-slate-300/25 rounded-lg cursor-pointer"
              onClick={addTask}
            />
            <MdClose
              className="ml-1 h-full text-5xl bg-slate-300/50 hover:bg-slate-300/25 rounded-lg cursor-pointer"
              onClick={handlePopUp}
            />
          </div>
        </div>
        <div className="flex flex-col p-2 m-2 h-fit">
          <span className="text-4xl mb-2 select-none">Nombre:</span>
          <input
            required
            type="text"
            ref={inputRef}
            className="text-zinc-900 text-3xl rounded-lg"
            onChange={validateInput}
          />
          {error.inputError?.message && (
            <div className="bg-transparent text-red-600 ">{error.inputError.message}</div>
          )}
        </div>
        <div className="flex flex-col p-2 m-2 h-fit">
          <span className="text-4xl mb-2 select-none">Tarea:</span>
          <textarea
            required
            ref={textareaRef}
            className="text-4xl rounded-lg max-h-64 min-h-20 h-20 text-zinc-900 resize-y"
            onChange={validateTextarea}
          ></textarea>
          {error.textAreaError?.message && (
            <div className="bg-transparent text-red-600 ">{error.textAreaError.message}</div>
          )}
        </div>
        <div className="flex flex-col p-2 m-2 h-fit">
          <span className="text-4xl mb-2 select-none">Progreso:</span>
          <FormContext.Provider value={{ selected, setSelected }}>
            <RadioButtonsWithCheckbox />
          </FormContext.Provider>
        </div>
      </div>
    </div>
  )
}

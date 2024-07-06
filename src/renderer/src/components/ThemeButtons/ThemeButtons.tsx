import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { IoIosArrowBack } from 'react-icons/io'
import { useState, useEffect, createContext, useContext } from 'react'
import { ContextMenu } from '@renderer/components'
import { twMerge } from 'tailwind-merge'

interface ThemeContextType {
  handleChangeTheme: () => void
  handleThemeSystem: () => void
  contextMenu: boolean
  setContextMenu: React.Dispatch<any>
}

const defaultValue: ThemeContextType = {
  handleChangeTheme: () => {},
  handleThemeSystem: () => {},
  contextMenu: false,
  setContextMenu: () => {},
}

const ThemeContext = createContext<ThemeContextType>(defaultValue)

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeButton: React.FC = () => {
  const [animationClassButton, setAnimationClassButton] = useState('rotate-0')
  const [contextMenu, setContextMenu] = useState<boolean>(false)
  const [isThemeSystem, setIsThemeSystem] = useState<boolean>(false)
  const [theme, setTheme] = useState<string>(() => {
    const winTheme = localStorage.getItem('Theme')
    if (winTheme) {
      setIsThemeSystem(false)
      return winTheme
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    return 'light'
  })

  useEffect(() => {
    const handleThemeChange = (e: MediaQueryListEvent): void => {
      if (!localStorage.getItem('Theme')) setTheme(e.matches ? 'dark' : 'light')
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleThemeChange)

    return (): void => {
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [])

  useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (theme === 'dark') {
      htmlElement?.classList.add('dark')
    } else {
      htmlElement?.classList.remove('dark')
    }
    if (!isThemeSystem) localStorage.setItem('Theme', theme)
  }, [theme])

  useEffect(() => {
    let timeout1, timeout2
    const time = 100

    if (contextMenu) {
      timeout2 = setTimeout(() => {
        setAnimationClassButton('rotate-90')
      }, time)
    } else {
      setAnimationClassButton('rotate-0')
    }

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    }
  }, [contextMenu])

  const handleChangeTheme = (): void => {
    setIsThemeSystem(false)
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const handleThemeSystem = (): void => {
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    localStorage.removeItem('Theme')
    setIsThemeSystem(true)
  }

  const handleContextMenu = (): void => {
    setContextMenu(!contextMenu)
  }

  return (
    <ThemeContext.Provider
      value={{ handleChangeTheme, handleThemeSystem, contextMenu, setContextMenu }}
    >
      <div>
        <button
          className="flex justify-center items-center rounded-xl backdrop-blur bg-slate-700 dark:bg-slate-300 hover:bg-slate-600/75 transition ease-in-out text-zinc-200 dark:text-zinc-800 hover:dark:text-zinc-300 p-5 text-3xl m-3 fixed bottom-1 right-1"
          onContextMenu={handleContextMenu}
          onClick={() => {
            if (!contextMenu) handleChangeTheme()
            else setContextMenu(!contextMenu)
          }}
        >
          {contextMenu ? (
            <IoIosArrowBack className={twMerge(animationClassButton, 'duration-200')} />
          ) : theme === 'dark' ? (
            <MdOutlineLightMode />
          ) : (
            <MdOutlineDarkMode />
          )}
        </button>
        <ContextMenu />
      </div>
    </ThemeContext.Provider>
  )
}

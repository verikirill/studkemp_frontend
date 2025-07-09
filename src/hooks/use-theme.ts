import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

type Theme = 'light' | 'dark'

const THEME_COOKIE_KEY = 'studkemp-theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Принудительно устанавливаем темную тему
    const forcedTheme = 'dark'
    
    setTheme(forcedTheme)
    setIsLoaded(true)
    
    // Применяем тему к документу
    applyTheme(forcedTheme)
    
    // Сохраняем в куки
    Cookies.set(THEME_COOKIE_KEY, forcedTheme, { expires: 365 })
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)
  }

  const toggleTheme = () => {
    // Ничего не делаем - всегда темная тема
    return
  }

  const setSpecificTheme = (_newTheme: Theme) => {
    // Принудительно устанавливаем темную тему независимо от параметра
    setTheme('dark')
    applyTheme('dark')
    Cookies.set(THEME_COOKIE_KEY, 'dark', { expires: 365 })
  }

  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isLoaded,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  }
} 
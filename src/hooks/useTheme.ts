import { useEffect, useState } from 'react'

type theme = 'light' | 'dark'

export function useTheme (): [theme, () => void] {
    const [theme, setTheme] = useState<theme>('light')

    const toggleTheme = () => {
        if (theme === 'light') {
            window.localStorage.setItem('theme', 'dark')
            setTheme('dark')
        } else {
            window.localStorage.setItem('theme', 'light')
            setTheme('light')
        }
    }

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme')
        if (localTheme && isValidTheme(localTheme)) {
            setTheme(localTheme)
        }
    }, [])

    return [
        theme,
        toggleTheme,
    ]
}

function isValidTheme(theme: string): theme is theme {
    return theme === 'light' || theme === 'dark'
}

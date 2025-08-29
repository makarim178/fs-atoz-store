import { useMemo, useState } from 'react'
import { ThemeContext } from '@/contexts/ThemeContext'
import type { ReactNode } from 'react'
import type { ThemeType } from '@/constants/theme'

export function ThemeProvider({children}: {children: ReactNode}) {
    const [theme, setTheme] = useState<ThemeType>('light')

    const toggleTheme = () => setTheme((prev: ThemeType) => prev === 'light' ? 'dark' : 'light')
    const contextValue = useMemo(() => ({ theme, toggleTheme }),[theme])

    return (
        <ThemeContext.Provider value={ contextValue }>
            { children }
        </ThemeContext.Provider>
    )
}
import React, { createContext, useContext, useMemo, useState } from "react"
import type { ThemeType } from "@/constants/theme"

interface ThemeContextType {
    theme: ThemeType,
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => {}
})

export function ThemeProvider({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState<ThemeType>('light')

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
    const contextValue = useMemo(() => ({ theme, toggleTheme }),[theme])

    return (
        <ThemeContext.Provider value={ contextValue }>
            { children }
        </ThemeContext.Provider>
    )
}

export function useThemeContext() {
    return useContext(ThemeContext)
}
import { THEME_CONFIG, THEMES } from '@/constants/theme'
import { useThemeContext } from '@/hooks/useTheme'

export function ThemeButton () {
    const { theme, toggleTheme } = useThemeContext()

    const getThemeIcon = () => {
        const themeKey = theme === THEMES.LIGHT ? THEMES.LIGHT : THEMES.DARK
        return THEME_CONFIG[themeKey].icon
    }
    return (
        <div 
            className={`h-8 w-8 rounded-3xl 
                main-border flex justify-center 
                items-center cursor-pointer transition duration-300 ease-in-out 
                hover:rotate-30 bg-none`}
            onClick={toggleTheme}
        >
            { getThemeIcon() }
        </div>
    )
}
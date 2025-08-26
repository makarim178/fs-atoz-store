import { THEME_CONFIG, THEMES } from '@/constants/theme'
import { useThemeContext } from '@/providers/ThemeContext';

export function ThemeButton () {
    const { theme, toggleTheme } = useThemeContext()

    const getThemeIcon = () => {
        const themeKey = theme === THEMES.LIGHT ? THEMES.LIGHT : THEMES.DARK
        return THEME_CONFIG[themeKey].icon
    }
    return (
        <div 
            className={`h-8 w-8 border-2 opacity-50 rounded-3xl 
                border-[#242424] dark:border-white flex justify-center 
                items-center cursor-pointer transition duration-300 ease-in-out 
                hover:rotate-30`}
            onClick={toggleTheme}
        >
            { getThemeIcon() }
        </div>
    )
}
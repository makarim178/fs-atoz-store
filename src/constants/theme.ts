export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
} as const

export type ThemeType = typeof THEMES[keyof typeof THEMES]

export const THEME_CONFIG = {
    [THEMES.LIGHT]: {
        name: 'Light Mode',
        icon: '☀️'
    },
    [THEMES.DARK]: {
        name: 'Dark Mode',
        icon: '🌙'
    }
} as const
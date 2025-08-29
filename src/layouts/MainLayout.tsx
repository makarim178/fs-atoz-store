import { FooterComponent } from "@/components/layout/Footer";
import { HeaderComponent } from "@/components/layout/Header";
import { THEMES } from "@/constants/theme";
import { useThemeContext } from "@/hooks/useTheme";
import type { OnlyChildrenPropsType } from "@/types/props";
import { useEffect, useRef } from "react";


export const MainLayout = ({ children }: OnlyChildrenPropsType) => {
    const rootElementRef = useRef<HTMLDivElement>(null)
    
    const { theme } = useThemeContext();

    const addClassToRoot = () => {
        if (rootElementRef?.current) {
            const rootElement = rootElementRef.current
            const prevTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
            if (rootElement.classList.contains(theme)) rootElement.classList.remove(prevTheme)
            rootElement.classList.add(theme)
        }
    }

    useEffect(() => {
        addClassToRoot()
    }, [theme])

    

    return (
        <>
        <div ref={rootElementRef} className="flex flex-col main-bg min-h-screen justify-between">
            <HeaderComponent />
            <main className="pb-4 mt-20">
                {children}
            </main>
            <FooterComponent />
        </div>
        </>
    )
}
import { Copyright } from "@mui/icons-material"
export const FooterComponent = () => {
    const copyRightContext = new Date().getFullYear() + " AtoZ Store. All Rights Reserved."
    return (
        <footer className="main-bg text-center py-4 text-sm border-t/40 shadow-inner">
            <span className="flex justify-center content-center gap-2 text-neutral-700 dark:text-neutral-200">
                <Copyright color="inherit" /> 
                <span>{ copyRightContext }</span>
            </span>
        </footer>
    )
}
import { Link } from 'react-router-dom'
import { CartIcon } from '../cart/cartIcon'
import { ThemeButton } from '../ui/themeButton/ThemeButton'

export const HeaderComponent = () => {
    return (
        <header className="fixed top-0 left-0 w-full main-bg dark:text-white shadow-md z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <Link to="/" className="text-xl font-bold">
                    AtoZStore
                </Link>
                <nav className="flex gap-6">
                    <Link to='/cart' className="hover:text-blue-800 dark:hover:text-gray-200">
                        <CartIcon/>
                    </Link>
                <ThemeButton />
                </nav>
            </div>
        </header>
    )
}
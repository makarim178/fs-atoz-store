// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { ProductList } from '@/components/Products/ProductList';
import { ThemeButton } from '@/components/ui/themeButton/ThemeButton';
import { THEMES } from '@/constants/theme';
import { useThemeContext } from '@/providers/ThemeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductProvider } from './providers/ProductsContext';
import { ProductSearch } from './components/Products/ProductSearch';
import { DoubleSlider } from './components/ui/doubleSlider/DoubleSlider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 3
    }
  }
})

function App() {
  const { theme } = useThemeContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div className={ theme === THEMES.LIGHT ? THEMES.LIGHT : THEMES.DARK }>
        <div className='w-screen h-screen flex bg-white dark:bg-[#242424]'>
            <div className='w-full h-full content-center text-center text-[#242424] dark:text-white'>
              <ThemeButton />
              <ProductProvider >
                <ProductSearch />
                <DoubleSlider />
                <ProductList />
              </ProductProvider>
            </div>
        </div>
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App

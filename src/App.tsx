import { Toaster } from 'sonner';
import { RouteList } from './routes/RouteList';
import { CartProvider } from './providers/CartProvider';
import { ProductProvider } from './providers/ProductsProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CartProvider>
        <ProductProvider>
          <Router>
            <Routes>
              {
                RouteList.map(route => (
                  <Route path={route.path} element={route.element} />
                ))
              }
            </Routes>
          </Router>
        </ProductProvider>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App

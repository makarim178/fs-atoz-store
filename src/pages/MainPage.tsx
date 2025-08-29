import { Suspense } from 'react'
import { ProductList } from '@/components/Products/ProductList'
import { MainLayout } from '@/layouts/MainLayout'
import { ProductFilterComponent } from '@/components/Products/ProductFilter'

export const MainPage = () => {
    
    return (
        <MainLayout>
            <div className='flex flex-col md:flex-row main-bg'>
                <ProductFilterComponent />
                <div className="flex flex-col">
                   {/* <Suspense fallback={<CircularProgress />}> */}
                   <Suspense fallback={<span>Loading...</span>}>
                        <ProductList />
                    </Suspense>
                </div>
            </div>
        </MainLayout>
    )
}
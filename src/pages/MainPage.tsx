import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { ProductList } from "@/components/Products/ProductList"
import { MainLayout } from "@/layouts/MainLayout"
import { ProductFilterComponent } from "@/components/Products/ProductFilter"

export const MainPage = () => {
    
    return (
        <MainLayout>
            <div className='flex flex-col md:flex-row main-bg'>
                <ProductFilterComponent />
                <Suspense fallback={<CircularProgress />}>
                    <div className="flex flex-col">
                        <ProductList />
                    </div>
                </Suspense>
            </div>
        </MainLayout>
    )
}
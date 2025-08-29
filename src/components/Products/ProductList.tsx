import { memo } from "react"
import { ProductCard } from "./ProductCard"
import { Pagination } from "../ui/pagination/Pagincation"
import { useProductContext } from "@/hooks/useProduct"

export const ProductList = memo(() => {
    const { 
        products, 
    } = useProductContext()
    return (
        <>
            <h3 className="text-lg font-semibold px-4">Products</h3>
            <div className="flex flex-wrap justify-around">
                {
                    products.map(product => (
                        <ProductCard key={product.productId} product={product}  />
                    ))
                }
            </div>
            <Pagination />
        </>
    )
})
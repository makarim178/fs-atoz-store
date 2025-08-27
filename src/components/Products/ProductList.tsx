import { memo } from "react"
import { useProductContext } from "@/providers/ProductsContext"
import { ProductCard } from "./ProductCard"
import { Pagination } from "../ui/pagination/Pagincation"

export const ProductList = memo(() => {
    const { 
        products, 
        loading,
    } = useProductContext()

    if (loading) return (<div>Loading...</div>)
    return (
        <>
            <h1>Products</h1>
            <div className="flex flex-wrap justify-evenly p-12">
                {
                    products.map(product => (<ProductCard key={product.productId} product={product}  />))
                }
            </div>
            <Pagination />
        </>
    )
})
import type { ProductType } from "@/types/product"

export const ProductCard = ({ product }: { product: ProductType}) => {
    return (<li>{ product.name } : {product.price}</li>)
}
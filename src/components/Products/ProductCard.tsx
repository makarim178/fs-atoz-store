import type { ProductType } from "@/types/product"

export const ProductCard = ({ product }: { product: ProductType}) => {
    const getDescription = () => {
        if (product.description.length > 80) {
            return product.description.slice(0, 80).trim() + "..."
        }
        return product.description
    }
    return (
        <div className="border flex-1/5 p-4 m-2 rounded-sm">
            <div className="w-full h-auto mb-2">
                <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-cover mx-auto"/>
            </div>
            <h2 className="text-lg font-semibold mb-1">{ product.name }</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-1 text-ellipsis">{ getDescription() }</p>
            <p className="text-gray-800 dark:text-gray-200 font-bold">${ product.price.toFixed(2) }</p>
            <button>Add to Cart</button>
        </div>
    )
}
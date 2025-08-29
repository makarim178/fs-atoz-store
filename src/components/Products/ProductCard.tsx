import { useCart } from '@/hooks/cart/useCart'
import type { AddToCartPayloadType } from '@/types/cart'
import type { ProductType } from '@/types/product'
import { throttle } from '@/utils/common'
import { CircularProgress } from '@mui/material'
import type { UUID } from 'crypto'
import { useState } from 'react'
import { toast } from 'sonner'
import AddIcon from '@mui/icons-material/Add'

export const ProductCard = ({ product }: { product: ProductType}) => {
    const [id, setId] = useState<UUID | null>(null)

    const { 
        addToCart, 
        getCartId, 
        isAddingToCart, 
        retreiveCartItemIdByProductId,
        incrementQuantity
    } = useCart()
    const getDescription = () => {
        if (product.description.length > 80) {
            return product.description.slice(0, 80).trim() + "..."
        }
        return product.description
    }

    const handleAddToCart = async () => {
        try {
            const cartId = getCartId()
            if (!cartId) {
                toast.error('Cannot add to cart, Cart Id is not generated!')
                return
            }

            setId(product.productId)
            const cartItemId = retreiveCartItemIdByProductId(product.productId)

            if (cartItemId) {
                toast.info('Item is already available in Cart!')
                incrementQuantity(cartItemId)
                toast.success('Item quantity incremented by 1 in cart')
                return
            }
            const cartItem: AddToCartPayloadType = {
                cartId: cartId, 
                productId: product.productId,
                quantity: 1
            }
            await addToCart(cartItem)       
        } finally {
            setId(null)
        }
    }

    const isLoading = () => id === product.productId && isAddingToCart

    const throttleHandler = throttle(handleAddToCart)
    return (
        <div className="md:flex-6/12 lg:flex-4/12 p-4 flex flex-col gap-2">
            <div className="border-1 main-border product-image-bg rounded-xs shadow-sm">
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="product-image"
                />
            </div>
            <div className="flex text-left text-color-theme justify-between">
                <h4 className="text-sm lg:text:md font-semibold mb-1">{ product.name }</h4>
                <p className="text-sm lg:text-md">${ product.price.toFixed(2) }</p>
            </div>
            <div className="flex items-center content-center gap-6 justify-between">
                <p className="text-color-theme mb-1 text-left text-xs lg:text-sm">{ getDescription() }</p>
                <button 
                    onClick={throttleHandler}
                    disabled={isLoading()}
                    className="mt-2 button-color-theme text-color-on-gray px-3 py-2 roundeddisabled:opacity-50 cursor-pointer rounded-sm"
                >
                    { isLoading() ? <CircularProgress size={12} color="inherit"/> : <AddIcon />}
                </button>
            </div>
        </div>
    )
}
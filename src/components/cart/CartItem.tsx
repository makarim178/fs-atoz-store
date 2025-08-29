import { useCart } from "@/hooks/cart/useCart"
import { 
    RemoveCircleOutlineRounded, 
    AddCircleOutlineRounded, 
    RemoveShoppingCartRounded
} from '@mui/icons-material'
import type { CartItemComponentPropsType } from "@/types/cart"

export const CartItemComponent = ({ item }: CartItemComponentPropsType) => {
    const {
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        isUpdatingCart,
        isRemovingFromCart
     } = useCart()

     const handleIncrement = async () =>  {
        try {
            await incrementQuantity(item.cartItemId)            
        } catch (error) {
            console.error('Failed to increment quantity', error)            
        }
    }
    
    const handleDecrement = async () => {
        try {
            await decrementQuantity(item.cartItemId)
        } catch (error) {
            console.error('Failed to decrement quantity', error)                        
        }
    }
    
    const handleRemove = async () => {
        try {
            await removeFromCart(item.cartItemId)   
        } catch (error) {
            console.error('Failed to remove item', error)
        }
     }

    return (
            <div className="flex flex-row md:flex-col md:flex-6/12 lg:flex-4/12 md:content-center p-4 border-b border-neutral-300 md:border-b-0">
                <div className="border-1 main-border product-image-bg rounded-xs shadow-sm overflow-hidden max-w-32 md:max-w-72">
                    <img 
                        src={item.imageUrl} alt={item.productName} 
                        className="object-cover hover:scale-120 max-w-32 md:max-w-72"/>
                </div>
                <div className="flex md:flex-col w-full">
                    <div className="flex-1 justify-around md:flex md:flex-col md:justify-between ml-4 md:ml-0">
                        <div className="flex flex-col md:flex-row">
                            <h4 className="font-semubold">{item.productName}</h4>
                            <p className="text-gray-600 darl:text-gray-200">${item.price.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:tet-gray-300">Total: ${item.lineTotal}</p>
                    </div>
                    <div className="flex items-center justify-around md:justify-start">
                        <button 
                            onClick={handleDecrement}
                            disabled={isUpdatingCart}
                            className="py-1 rounded disabed:opacity-50 cursor-pointer">
                            <RemoveCircleOutlineRounded className="text-gray-600 dark:text-gray-200 hover:text-amber-700 "/>
                        </button>
                        <span className="px-4 py-2 rounded">{item.quantity}</span>
                        <button 
                            onClick={handleIncrement}
                            disabled={isUpdatingCart}
                            className="px-3 py-1 rounded disabed:opacity-50 cursor-pointer">
                            <AddCircleOutlineRounded className="text-gray-600 dark:text-gray-200 hover:text-blue-800"/>
                        </button>
                        <button 
                            onClick={handleRemove}
                            disabled={isRemovingFromCart}
                            className="px-3 py-1 rounded disabed:opacity-50 cursor-pointer">
                            <RemoveShoppingCartRounded className="text-red-600 dark:text-red-700 hover:opacity-50"/>
                        </button>
                    </div>
                </div>
            </div>
    )
}
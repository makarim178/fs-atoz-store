import type { UUID } from 'crypto'
import { useOptimistic} from 'react'
import type { CartItemType, CartType } from '@/types/cart'
import { optimisticReducer } from '@/utils/cart/optimisticReducer'

export const useCartOptimistic = (cart: CartType | null | undefined) => {
    const [optimisticCart, setOptimisticCart] = useOptimistic(
        cart ?? ({} as CartType), 
        optimisticReducer
    )

    const addOptimisticItem = (item: CartItemType) => {
            setOptimisticCart({ type: 'ADD_ITEM', payload: item})
    }
    
    const removeOptimisticItem = (cartItemId: UUID) => {
            setOptimisticCart({ type: 'REMOVE_ITEM', payload: cartItemId })        
    }
    
    const updateOptimisticQuantity = (cartItemId: UUID, quantity: number) => {
            setOptimisticCart({ type: 'UPDATE_QUANTITY', payload: { cartItemId, quantity }})
    }
    
    const clearOptimisticCart = () => {
            setOptimisticCart({ type: 'CLEAR_CART' })            
    }

    const finalOptimisticCart = cart === null && !optimisticCart?.id ? null : optimisticCart

    return {
        optimisticCart: finalOptimisticCart,
        addOptimisticItem,
        removeOptimisticItem,
        updateOptimisticQuantity,
        clearOptimisticCart
    }
}
import { useEffect, useState } from 'react'
import { 
    generateSessionId, 
    getStoredSessionId, 
    setStoreSessionId 
} from '@/shared/helpers/localStorage'
import type { 
    CartContextType, 
    CartProviderPropsType 
} from '@/types/cart'
import type { UUID } from 'crypto'
import { CartContext } from '@/contexts/CartContext'
import { useCartData } from '@/hooks/cart/useCartData'
import { useCartActions } from '@/hooks/cart/useCartActions'
import { useCartMutations } from '@/hooks/cart/useCartMutations'
import { useCartOptimistic } from '@/hooks/cart/useCartOptimistic'

export const CartProvider = ({ children }: CartProviderPropsType) => {
    const [sessionId, setSessionId] = useState<UUID | null>(null)
    const [isInitiated, setIsInitiated] = useState<boolean>(false)
    useEffect(() => {
        const initializeSession = () => {
            let storedSessionId = getStoredSessionId()
            if (!storedSessionId) {
                storedSessionId = generateSessionId()
                setStoreSessionId(storedSessionId)
            }
            setSessionId(storedSessionId)
            setIsInitiated(true)
        }

        if (!isInitiated) initializeSession()
    }, [isInitiated])

    const { initCartMutation } = useCartMutations(sessionId)

    const { data: cart, isLoading, error } = useCartData(sessionId, initCartMutation)

    const { 
        optimisticCart, 
        addOptimisticItem,
        removeOptimisticItem,
        updateOptimisticQuantity,
        clearOptimisticCart
    } = useCartOptimistic(cart)

    const actions = useCartActions({
        cart,
        sessionId,
        addOptimisticItem,
        removeOptimisticItem,
        updateOptimisticQuantity,
        clearOptimisticCart
    })

    const isItemAvailableOnCart = (productId: UUID): boolean => {
        if (!cart?.items) return false
        
        return cart?.items.findIndex(c => c.productId === productId) >= 0
    }

    const retreiveCartItemIdByProductId = (productId: UUID) => cart?.items?.find(c => c.productId === productId)?.cartItemId

    useEffect(() => {
        if (sessionId && !cart && !isLoading && !isInitiated) {
            initCartMutation.mutate(sessionId)
        }
    }, [sessionId, cart, isLoading, initCartMutation, isInitiated])

    const contextValue: CartContextType = {
        cart,
        optimisticCart,
        sessionId,
        isLoading: isLoading || initCartMutation.isPending,
        error,
        getCartId: () => cart?.id ?? null, 
        isItemAvailableOnCart,
        retreiveCartItemIdByProductId,
        ...actions
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}
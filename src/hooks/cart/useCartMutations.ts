import { toast} from 'sonner'
import type { UUID } from 'crypto'
import { CartServices } from '@/services/cart.services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { 
    AddToCartPayloadType, 
    CartItemType, 
    CartType, 
    OrderType, 
    UpdateCartItemPayloadType 
} from '@/types/cart'

export const useCartMutations = (sessionId: UUID | null) => {

    const queryClient = useQueryClient()
    
    const cartQueryKeys = ['cart', sessionId]

    const initCartMutation = useMutation<CartType, Error, UUID>({
        mutationFn: (sessionId) => CartServices.createSession(sessionId),
        onSuccess: (cart) => queryClient.setQueryData(cartQueryKeys, cart),
        onError: err => {
            toast.error('Could not initiate Cart. Please reload!')
            console.error(err.message)
        }
    })

    const addToCartMutation = useMutation<CartItemType, Error, AddToCartPayloadType>({
        mutationFn: async (item: AddToCartPayloadType) => {
            if (!item.cartId) {
                toast.error('Cart not initiated')
                throw new Error('Cart not initialized')
            }
            const payload: AddToCartPayloadType = {
                cartId: item.cartId,
                productId: item.productId,
                quantity: item.quantity || 1
            }

            return CartServices.addToCart(payload)
        },
        onSuccess: () => {
            toast.success('Added item to cart.')
            return queryClient.invalidateQueries({ queryKey: cartQueryKeys })
        },
        onError: err => {
            toast.error('Failed to add item to cart!')
            console.error(err.message)
        }
    })

    const updateCartItemMutation = useMutation<boolean, Error, UpdateCartItemPayloadType>({
        mutationFn: async (payload: UpdateCartItemPayloadType) => CartServices.updateCartItem(payload),
        onSuccess: () => {
            toast.success('Cart Item updated.')
            return queryClient.invalidateQueries({ queryKey: cartQueryKeys })
        },
        onError: err => {
            toast.error('Failed to update Cart item!')
            console.error(err.message)
        }
    })

    const removeFromCartMutation = useMutation<boolean, Error, UUID>({
        mutationFn: (cartItemId: UUID) => CartServices.removeCartItem(cartItemId),
        onError: (err) => {
            toast.error(err.message)
        },
        onSuccess: () => {
            toast.success('Successfully! removed item from cart!')
            return queryClient.refetchQueries({ queryKey: cartQueryKeys})
        },
    })

    const createOrderMutation = useMutation<OrderType, Error, UUID>({
        mutationFn: () => CartServices.createOrder(sessionId),
        onSuccess: () => {
            toast.success('Congratulations! Order has been created!')
            return queryClient.invalidateQueries({ queryKey: cartQueryKeys })
        },
        onError: err => {
            toast.error('Unfortunately, could not generate order!')
            console.error(err.message)
        }
    })

    return {
        initCartMutation,
        addToCartMutation,
        updateCartItemMutation,
        removeFromCartMutation,
        createOrderMutation
    }
}
import type { AddToCartPayloadType, CartItemType, OrderType, UpdateCartItemPayloadType, UseCartActionPropsType, UseCartActionResponseType } from "@/types/cart";
import { useQueryClient } from "@tanstack/react-query";
import { useCartMutations } from "./useCartMutations";
import { startTransition, useCallback } from "react";
import type { UUID } from "crypto";
import { clearStoredSessionId } from "@/shared/helpers/localStorage";
import { useProductContext } from "../useProduct";
import { toast } from "sonner";

export const useCartActions = ({
    cart, 
    sessionId,
    addOptimisticItem,
    removeOptimisticItem,
    updateOptimisticQuantity,
    clearOptimisticCart
}: UseCartActionPropsType): UseCartActionResponseType => {
    const queryClient = useQueryClient()
    const cartQueryKey = ['cart', sessionId]
    const { products } = useProductContext()

    const {
        addToCartMutation,
        updateCartItemMutation,
        removeFromCartMutation,
        createOrderMutation
    } = useCartMutations(sessionId)


    const addToCart = useCallback(async (item: AddToCartPayloadType): Promise<void> => {
        if (!cart){ 
            toast.error('Cart is not available')
            return Promise.resolve()
        }
        const product = products.filter(p => p.productId === item.productId)
        const optimisticItem: CartItemType = {
            cartItemId: crypto.randomUUID(),
            productId: item.productId,
            productName: product?.[0]?.name ?? 'Loading...',
            imageUrl: product?.[0]?.imageUrl ?? '',
            price: product?.[0]?.price ?? 0,
            description: product?.[0]?.description ?? '',
            quantity: item.quantity ?? 1,
            lineTotal: 0
        }

        
        try {
            startTransition(async () => {
                addOptimisticItem(optimisticItem)
                await addToCartMutation.mutateAsync(item)
            })
        } catch (error) {
            queryClient.invalidateQueries({ queryKey: cartQueryKey })
            throw error
        }

    }, [removeFromCartMutation, removeOptimisticItem, queryClient, cartQueryKey])

    const removeFromCart = useCallback(async (cartItemId: UUID): Promise<void> => {
        try {
            startTransition(async () => {
                removeOptimisticItem(cartItemId)
                await removeFromCartMutation.mutateAsync(cartItemId)
            })
        } catch (error: Error | unknown) {
            queryClient.invalidateQueries({ queryKey: cartQueryKey })
            if (error instanceof Error) toast.error(error?.message)
                else toast.error('Could not remove item from cart!')
        }
    }, [removeFromCartMutation, removeOptimisticItem, queryClient, cartQueryKey])
    
    const incrementQuantity = useCallback(async (cartItemId: UUID): Promise<void> => {
        if (!cart) return Promise.resolve()
            const cartItem = cart.items.find(item => item.cartItemId === cartItemId)
        if (!cartItem) return Promise.resolve()
            const newQuantity = cartItem.quantity + 1
        
        try {
            const payload: UpdateCartItemPayloadType = {
                cartItemId,
                productId: cartItem.productId,
                productName: cartItem.productName,
                imageUrl: cartItem.imageUrl,
                price: cartItem.price,
                quantity: newQuantity
            }
            startTransition(async () => {
                updateOptimisticQuantity(cartItemId, newQuantity)
                await updateCartItemMutation.mutateAsync(payload)
            })
        } catch (error) {
            queryClient.invalidateQueries({ queryKey: cartQueryKey })
            throw error
        }
    }, [cart, updateCartItemMutation, updateOptimisticQuantity, queryClient, cartQueryKey])

    const decrementQuantity = useCallback(async (cartItemId: UUID): Promise<void> => {
        if (!cart) return Promise.resolve()
        const cartItem = cart.items.find(item => item.cartItemId === cartItemId)

        if (!cartItem) return Promise.resolve()

        if (cartItem.quantity <= 1) {
            await removeFromCart(cartItemId)
            return
        }

        const newQuantity = cartItem.quantity - 1
        
        try {
            const payload: UpdateCartItemPayloadType = {
                cartItemId,
                productId: cartItem.productId,
                productName: cartItem.productName,
                imageUrl: cartItem.imageUrl,
                price: cartItem.price,
                quantity: newQuantity
            }
            startTransition(async () => {
                updateOptimisticQuantity(cartItemId, newQuantity)
                await updateCartItemMutation.mutateAsync(payload)
            })
        } catch (error) {
            queryClient.invalidateQueries({ queryKey: cartQueryKey })
            throw error
        }

    }, [cart, updateCartItemMutation, updateOptimisticQuantity, removeFromCart, queryClient, cartQueryKey])

    const createOrder = useCallback(async ():Promise<OrderType> => {
        if (!sessionId) throw new Error('Cannot create order without session Id')
        const result = await createOrderMutation.mutateAsync(sessionId)
        clearOptimisticCart()
        clearStoredSessionId()
        return result
    }, [clearOptimisticCart, clearOptimisticCart])

    const clearCart = useCallback(():void => {
        clearOptimisticCart()
    }, [clearOptimisticCart])

    const getTotalItems = useCallback((): number => {
        if (!cart) return 0
        return cart.items.reduce((total, item) => total + item.quantity, 0)
    }, [cart])

    return {
        addToCart, 
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        createOrder,
        clearCart,
        getTotalItems,
        isAddingToCart: addToCartMutation.isPending,
        isUpdatingCart: updateCartItemMutation.isPending,
        isRemovingFromCart: removeFromCartMutation.isPending,
        isCreatingOrder: createOrderMutation.isPending
    }

}
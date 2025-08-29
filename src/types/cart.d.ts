import type { UUID } from "crypto"
import type React from "react"

type ItemType = {
    productId: UUID
    productName: string
    imageUrl: string
    price: number
    description: string
    quantity: number
    lineTotal: number
}
type CartItemType = {
    cartItemId: UUID
} & ItemType

type CartType = {
    id: UUID
    sessionId: UUID
    items: CartItemType[]
    total: number
}

type AddToCartRequestType = {
    productId: UUID
    quantity: number
}

type AddToCartPayloadType = {
    cartId: UUID
    productId: UUID
    quantity: number
}

type UpdateCartItemPayloadType = {
    cartItemId: UUID
    productId: UUID
    productName: string
    imageUrl: string
    price: number
    quantity: number
}

type OrderItemType = ItemType & {
    orderItemId: UUID
}

type OrderType = {
    id: UUID
    sessionId: UUID
    items: OrderItemType[]
    total: number
}
type OptimisticActionType = { type: 'ADD_ITEM', payload: CartItemType} 
    | {type: 'REMOVE_ITEM', payload: UUID } 
    | {type: 'UPDATE_QUANTITY', payload: { cartItemId: UUID, quantity: number } }
    | {type: 'CLEAR_CART' }


interface CartContextType {
    cart: CartType | null | undefined
    optimisticCart: CartType | null
    sessionId: UUID | null
    isLoading: boolean
    error: Error | null
    addToCart: (item: AddToCartPayloadType) => Promise<void>
    removeFromCart: (cartItemId: UUID) => Promise<void>
    incrementQuantity: (cartItemId: UUID) => Promise<void>
    decrementQuantity: (cartItemId: UUID) => Promise<void>
    createOrder: () => Promise<OrderType>
    clearCart: () => void
    getTotalItems: () => number
    isItemAvailableOnCart: (productId: UUID) => boolean
    retreiveCartItemIdByProductId: (productId: UUID) => UUID | null | undefined
    isAddingToCart: boolean
    isUpdatingCart: boolean
    isRemovingFromCart: boolean
    isCreatingOrder: boolean, 
    getCartId: () => UUID | null, 
}

interface CartProviderPropsType {
    children: React.ReactNode
}

interface UseCartActionPropsType {
    cart: CartType | null | undefined
    sessionId: UUID | null
    addOptimisticItem: (item: CartItemType) => void
    removeOptimisticItem: (cartItemId: UUID) => void
    updateOptimisticQuantity: (cartItemId: UUID, quantity: number) => void
    clearOptimisticCart: () => void
}

interface UseCartActionResponseType {
    addToCart: (item: AddToCartPayloadType) => Promise<void>
    removeFromCart: (cartItemId: UUID) => Promise<void>
    incrementQuantity: (cartItemId: UUID) => Promise<void>
    decrementQuantity: (cartItemId: UUID) => Promise<void>
    createOrder: () => Promise<OrderType>
    clearCart: () => void
    getTotalItems: () => number
    isAddingToCart: boolean
    isUpdatingCart: boolean
    isRemovingFromCart: boolean
    isCreatingOrder: boolean
}

type CartItemComponentPropsType = {
    item: CartItemType
}
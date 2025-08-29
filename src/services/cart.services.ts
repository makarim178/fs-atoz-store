import { BASE_URI, URI } from '@/constants/api'
import { REQUEST_HEADERS } from '@/constants/requestTypes'
import type { 
    AddToCartPayloadType, 
    CartItemType, 
    CartType, 
    OrderType, 
    UpdateCartItemPayloadType 
} from '@/types/cart'
import type { UUID } from 'crypto'

const postRequestOptions = (method: RequestType['method'] = 'POST'): PostRequestType => ({
    method,
    headers: REQUEST_HEADERS,
})

export const CartServices = {
    createSession: async (sessionId: UUID): Promise<CartType> => {
        const response = await fetch(`${BASE_URI}${URI.CREATE_SESSION}${sessionId}`, postRequestOptions())
        if (!response.ok) {
            throw new Error('Failed to create cart session')
        }
        return await response.json()
    },
    getCart: async (sessionId: UUID): Promise<CartType> => {
        if (!sessionId) throw new Error('Session Id is required to retrieve Cart')
        const response = await fetch(`${BASE_URI}${URI.GET_CART}${sessionId}`
            , {
                method: 'GET'
            })
        if (!response.ok) {
            throw new Error('Failed to fetch cart')
        }
        return await response.json()
    },
    addToCart: async (payload: AddToCartPayloadType): Promise<CartItemType> => {
            const response = await fetch(`${BASE_URI}${URI.ADD_TO_CART}`, {
                ...postRequestOptions(),
                body: JSON.stringify(payload)
            })
            if (!response.ok) {
                throw new Error('Failed to add item to cart')
            }
            return await response.json()
    },
    updateCartItem: async (payload: UpdateCartItemPayloadType): Promise<boolean> => {
        const response = await fetch(`${BASE_URI}${URI.UPDATE_CART_ITEM}`, {
            ...postRequestOptions('PUT'),
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            throw new Error('Failed to update cart item')
        }
        return true
    },
    removeCartItem: async (cartItemId: UUID): Promise<boolean> => {
        const respones = await fetch(`${BASE_URI}${URI.REMOVE_CART_ITEM}${cartItemId}`
            , { method: 'DELETE' })
        if (!respones.ok) {
            throw new Error('Failed to remove cart item')
        }
        return true
    },
    createOrder: async (sessionId: UUID | null): Promise<OrderType> => {
        if (!sessionId) throw new Error('Cannot generate order without sessionId')
        const response = await fetch(`${BASE_URI}${URI.CREATE_ORDER}${sessionId}`, postRequestOptions())
        if (!response.ok) {
            throw new Error('Failed to create order')
        }
        return await response.json()
    },
    getOrder: async (orderId: string): Promise<OrderType | null> => {
        if (!orderId) throw new Error('Could not retrieve Order, requires order Id')
        const response = await fetch(`${BASE_URI}${URI.GET_ORDER}${orderId}`)
        if (!response.ok) {
            throw new Error('Failed to retrieve Order Details')
        }
        return response.json()
    }

}
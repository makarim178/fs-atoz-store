import type { CartItemType, CartType, OptimisticActionType } from "@/types/cart";
import { calculateCartTotal } from "./cartCalculations";

export const optimisticReducer = (state: CartType, action: OptimisticActionType): CartType => {
    switch(action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex( item => item.productId === action.payload.productId)

            let newItems: CartItemType[]

            if (existingItemIndex >= 0) {
                const {quantity, price} = state.items[existingItemIndex]

                newItems = state.items.map((item, index) => index === existingItemIndex 
                    ? { 
                        ...item, 
                        quantity: quantity + action.payload.quantity, 
                        lineTotal: quantity * price
                    } : item)
            } else {
                newItems = [...state.items, action.payload]
            }
            return {
                ...state,
                items: newItems,
                total: calculateCartTotal(newItems)
            }
        }
        case 'REMOVE_ITEM': {
            const newItems = state.items.filter(item => item.cartItemId !== action.payload)
            return {
                ...state,
                items: newItems,
                total: calculateCartTotal(newItems)
            }
        }
        case 'UPDATE_QUANTITY': {
            const newitems = state.items.map(item => {
                if (item.cartItemId === action.payload.cartItemId) {
                    const newLineTotal = item.price * action.payload.quantity
                    return { 
                        ...item, 
                        quantity: action.payload.quantity, 
                        lineTotal: newLineTotal
                    }
                }
                return item
            })
            return {
                ...state,
                items: newitems,
                total: calculateCartTotal(newitems)
            }
        }
        case 'CLEAR_CART': {
            return {
                ...state,
                items: [],
                total: 0
            }
        }
        default: return state
    }
}
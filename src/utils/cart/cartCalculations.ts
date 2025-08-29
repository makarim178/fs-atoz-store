import type { CartItemType } from "@/types/cart";


export const calculateLineTotal = (price: number, quantity: number): number => price * quantity 

export const calculateCartTotal = (items: CartItemType[]): number  => items.reduce((total, { lineTotal }) => total + lineTotal, 0) 
export const getTotalItemCount = (items: CartItemType[]) => items.reduce((total, { quantity }) => total + quantity , 0)

export const updateItemQuantity = (item: CartItemType, newQuantity: number): CartItemType => {
    const lineTotal = calculateLineTotal(item.price, item.quantity)
    return {
        ...item,
        quantity: newQuantity,
        lineTotal
    }
}        

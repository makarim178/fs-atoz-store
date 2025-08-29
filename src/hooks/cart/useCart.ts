
import { CartContext } from '@/contexts/CartContext'
import type { CartContextType } from '@/types/cart'
import { useContext } from 'react'

export const useCart = (): CartContextType => {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within a Cart Provider')
    return context
}
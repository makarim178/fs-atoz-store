import { ROUTES } from '@/constants/globalConstants'
import { useCart } from '@/hooks/cart/useCart'
import { throttle } from '@/utils/common'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const CartSummary = () => {
    const { optimisticCart, getTotalItems, createOrder, isCreatingOrder, isLoading } = useCart()
    const navigate = useNavigate()

    const handleCheckout = async () => {
        try {
            const order = await createOrder()
            toast.success(`Order has been created. Order ID: ${order.id}`)
            navigate(`${ROUTES.ORDER}/${order.id}`)
        } catch (error) {
            toast.error('Order could not be created due to internal errors!')
            if (error instanceof Error) console.error("Order creation failed:", error.message)
        }
    }

    if (isLoading) return <div>Loading Cart...</div>

    if (!optimisticCart || !optimisticCart?.items?.length) {
        return (
            <div className="text-center py8">
                <p className="text-gray-500">
                    Your cart is Empty!
                </p>
            </div>
        )
    }

    return (
        <div className="border-1 main-border rounded-sm md:w-1/3 p-12 m-12">
            <h2 className="text-xl font-bold mb-4 title-text-theme">
                Cart Summary
            </h2>
            <div className="space-y-2 mb-4 title-text-theme">
                <div className="flex justify-between">
                    <span>Items ({ getTotalItems()})</span>
                    <span>${optimisticCart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt2">
                    <span>Total</span>
                    <span>${optimisticCart.total.toFixed(2)}</span>
                </div>
            </div>
            <button
                onClick={throttle(handleCheckout)}
                disabled={isCreatingOrder}
                className="py-3 w-full button-color-theme cursor-pointer"
            >
                { isCreatingOrder ? 'Creating Order... ' : 'Checkout'}
            </button>
        </div>
    )
}
import { useCart } from "@/hooks/cart/useCart"
import { CartItemComponent } from "./CartItem"

export const Cart = () => {
    const { optimisticCart } = useCart()
    return (
        <div className="flex flex-col md:w-2/3 justify-center">
            <h4>Total: {optimisticCart?.total}</h4>
            <div className="flex flex-col md:flex-row md:flex-wrap">
                {
                    optimisticCart?.items?.map(item => (
                        <CartItemComponent key={item.productId} item={item} />
                    ))
                }
            </div>

        </div>
    )
}
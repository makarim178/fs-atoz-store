import { Cart } from "@/components/cart/Cart"
import { CartSummary } from "@/components/cart/CartSummary"
import { MainLayout } from "@/layouts/MainLayout"

export const CheckoutPage = () => {
    return (
        <MainLayout>
            <div>
                <h3>Checkout</h3>
                <div className="flex flex-col md:flex-row gap-2 justify-between">
                    <Cart />
                    <CartSummary />
                </div>
            </div>
        </MainLayout>
    )
}
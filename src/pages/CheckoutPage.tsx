import { Cart } from "@/components/cart/Cart"
import { CartSummary } from "@/components/cart/CartSummary"
import { MainLayout } from "@/layouts/MainLayout"

export const CheckoutPage = () => {
    return (
        <MainLayout>
            <div className="p-4">
                <h3 className="text-lg font-semibold title-text-theme">Checkout</h3>
                <div className="flex flex-col md:flex-row gap-2 justify-between">
                    <Cart />
                    <CartSummary />
                </div>
            </div>
        </MainLayout>
    )
}
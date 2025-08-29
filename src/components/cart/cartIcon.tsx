import { ROUTES } from '@/constants/globalConstants'
import { useCart } from '@/hooks/cart/useCart'
import { ShoppingCart} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { MiniCartItemComponent } from './MiniCartItem'

export const CartIcon = () => {
    const { getTotalItems, optimisticCart } = useCart()
    const navigate = useNavigate()

    const totalItems = getTotalItems()

    const handleOnClick = () => {
        navigate(ROUTES.CHECKOUT)
    }

    return (
        <div className="relative group cursor-pointer" onClick={handleOnClick}>
            {/* { totalItems > 0 && ( */}
                <span className="cart-total-info md:hidden">
                    {totalItems}
                </span>
                <div className="hidden md:block mini-cart">
                    <h5 className="text-sm font-semibold px-4 text-neutral-700">Total Cart Items: {totalItems}</h5>
                    {
                        getTotalItems() > 0 && optimisticCart?.items.map(item => (
                            <MiniCartItemComponent key={item.productId} item={item} />
                        ))
                    }
                </div>
            {/* )} */}
            <ShoppingCart />
        </div>
    )

}
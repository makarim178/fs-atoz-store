import { MainPage } from '@/pages/MainPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { ROUTES } from '@/constants/globalConstants'
import { OrderSubmittedPage } from '@/pages/OrderSubmittedPage'

export const RouteList = [
    {
        path: ROUTES.HOME,
        element: <MainPage />
    },
    {
        path: ROUTES.CHECKOUT,
        element: <CheckoutPage />
    },
    {
        path: `${ROUTES.ORDER}/:orderId`,
        element: <OrderSubmittedPage />
    }
]
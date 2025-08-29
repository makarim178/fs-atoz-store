import { CartServices } from "@/services/cart.services"
import type { OrderType } from "@/types/cart"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

export const OrderSubmittedPage = () => {
    const { orderId } = useParams()
    const [order, setOrder] = useState<OrderType | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    if (!orderId) {
        toast.error('Could not fetch Order Id')
        console.error('Could not fetch Order Id')
        return
    }

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true)
                const response = await CartServices.getOrder(orderId)
                setOrder(response)
                toast.success('Order retrieved Successfully!')
            } catch (error) {
                toast.error('Sorry! Could not retrieve Order! Please try again later!')
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [])

    if (loading ) return <div>loading...</div>

    const handlenNavigation = () => {
        navigate('/')
    }
    return (
        <div className="flex w-full justify-center p-12">
            <div className="w-full md:w-2/4 border-1 main-border p-12 shadow-md rounded-sm text-center flex flex-col gap-3">
                <h3 className="text-lg font-semibold ">Thank you for Ordering Products from AtoZStore!</h3>
                <p>Your Order id: <strong>{order?.id}</strong></p>
                <button onClick={handlenNavigation} className="button-color-theme px-12 py-4 rounded-sm shadow-md cursor-pointer">Click to Order more items.</button>
            </div>
        </div>
    )
}
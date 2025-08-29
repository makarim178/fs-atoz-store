import { CartServices } from "@/services/cart.services";
import type { CartType } from "@/types/cart";
import { useQuery } from "@tanstack/react-query";
import type { UUID } from "crypto";

export const useCartData = (sessionId: UUID | null, initCartMutation: any) => {
    return useQuery<CartType, Error>({
        queryKey: ['cart', sessionId],
        queryFn: () => {
            if (!sessionId) throw new Error('No session Id available!')
            return CartServices.getCart(sessionId)}
        ,
        enabled: !!sessionId,
        retry: (failureCount) => {
            if (failureCount < 1) {
                initCartMutation.mutate(sessionId)
                return false
            }
            return true
        }
    })
}
import type { CartItemComponentPropsType } from '@/types/cart'

export const MiniCartItemComponent = ({ item }: CartItemComponentPropsType) => {
    return (
            <div className="flex flex-row p-4 border-b w-full main-border">
                <img src={item.imageUrl} alt={item.productName} className="w-12 h-12"/>
                <div className="flex w-full">
                    <div className="flex-1 justify-around ml-4">
                        <h4 className="font-semubold text-xs">{item.productName}</h4>
                        <p className="text-gray-600 darl:text-gray-200 text-xs">${item.price.toFixed(2)} x {item.quantity} | <strong>${item.lineTotal}</strong></p>
                    </div>
                </div>
            </div>
    )
}
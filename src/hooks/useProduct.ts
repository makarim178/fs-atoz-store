import { useContext } from "react";
import { ProductContext } from "@/contexts/ProductContext";
import type { ProductsContextType } from "@/types/product";

export const useProductContext = ():ProductsContextType => {
    const context= useContext(ProductContext)
    if (!context) throw new Error('useProduct must be used within a Product Provider')
    return context
}
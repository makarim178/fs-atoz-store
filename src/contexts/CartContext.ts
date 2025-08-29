import type { CartContextType } from "@/types/cart";
import { createContext } from "react";

export const CartContext = createContext<CartContextType | undefined>(undefined)
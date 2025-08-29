import { createContext } from "react";
import type { QueryObserverResult } from "@tanstack/react-query";
import { DEFAULT_SEARCH_QUERY } from "@/constants/requestTypes";
import type { ProductsContextType, ProductSearchResponseType } from "@/types/product";

export const ProductContext = createContext<ProductsContextType>({
    products: [],
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        pageSize: 10
    },
    searchQuery: DEFAULT_SEARCH_QUERY,
    setSearchQuery: () => {},
    loading: false,
    fetching: false,
    error: null,
    refetch: async() => Promise.resolve({} as QueryObserverResult<ProductSearchResponseType, Error>)
});
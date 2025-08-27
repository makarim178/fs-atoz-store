
import { DEFAULT_SEARCH_QUERY } from "@/constants/requestTypes";
import { productService } from "@/services/product";
import type { PaginationType, ProductSearchCriteria, ProductSearchResponseType, ProductType } from "@/types/product";
import { useQuery, type QueryObserverResult, type RefetchOptions } from "@tanstack/react-query";
import { debounce } from "lodash";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface ProductsContextType {
    products: ProductType[] | []
    pagination: PaginationType
    searchQuery: ProductSearchCriteria
    setSearchQuery: (query: ProductSearchCriteria) => void
    loading: boolean
    error: Error | null
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<ProductSearchResponseType, Error>>
}

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
    error: null,
    refetch: async() => Promise.resolve({} as QueryObserverResult<ProductSearchResponseType, Error>)
});

export const ProductProvider = ({children} : { children: React.ReactNode}) => {
    const [searchQuery, setSearchQuery] = useState<ProductSearchCriteria>(DEFAULT_SEARCH_QUERY)
    const [debouncedQuery, setDebouncedQuery] = useState<string>('')

    const debouneSearch = useMemo(() => debounce((query: ProductSearchCriteria) => {
        setDebouncedQuery(JSON.stringify(query))
    }, 500)
    ,[])

    useEffect(() => {
        debouneSearch(searchQuery)
        return () => debouneSearch.cancel()
    }, [searchQuery, debouneSearch])

    const {
        data, 
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['products', debouncedQuery],
        queryFn: async() => {
            const requestBody:ProductSearchCriteria = productService.destructureProductSearch(debouncedQuery)
            const response = await productService.searchProduct(requestBody)
            return response
        },
        enabled: true,
        staleTime: 5 * 60 * 1000,
        gcTime: 10* 60 * 100
    })
    return (
        <ProductContext.Provider value={{
            products: data?.products || [],
            pagination: {
                currentPage: data?.currentPage || 1,
                totalPages: data?.totalPages || 1,
                totalCount: data?.totalCount || 0,
                pageSize: data?.pageSize || 10,
                hasNextPage: data?.hasNextPage || false,
                hasPreviousPage: data?.hasPreviousPage || false
            },
            searchQuery,
            setSearchQuery,
            loading: isLoading,
            error,
            refetch
        }}>
            { children }
        </ProductContext.Provider>
    )
}

export const useProductContext = () => useContext(ProductContext)
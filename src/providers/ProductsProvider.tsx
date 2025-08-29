
import { debounce } from 'lodash'
import { productService } from '@/services/product'
import { useEffect, useMemo, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ProductContext } from '@/contexts/ProductContext'
import { DEFAULT_SEARCH_QUERY } from '@/constants/requestTypes'
import type { ProductSearchCriteria } from '@/types/product'

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
        isFetching,
        error,
        refetch
    } = useSuspenseQuery({
        queryKey: ['products', debouncedQuery],
        queryFn: async() => {
            const requestBody:ProductSearchCriteria = productService.destructureProductSearch(debouncedQuery)
            const response = await productService.searchProduct(requestBody)
            return response
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10* 60 * 100,
        refetchOnWindowFocus: false,
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
            fetching: isFetching,
            error,
            refetch
        }}>
            { children }
        </ProductContext.Provider>
    )
}
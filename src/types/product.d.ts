import type { UUID } from 'crypto'

interface DynamicObject {
    [key: string]: string
}

type ProductType = {
    productId: UUID
    name: string
    price: number
    description: string
    imageUrl: string
}

type ProductSearchResponseType = {
    products: Product[]
} & PaginationType

type ProductSearchCriteria = {
    search?: string
    minPrice?: number | null
    maxPrice?: number | null
    page: number
    pageSize: number
}

type PaginationType = {
    totalCount: number
    currentPage: number
    pageSize: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

interface ProductsContextType {
    products: ProductType[] | []
    pagination: PaginationType
    searchQuery: ProductSearchCriteria
    setSearchQuery: (query: ProductSearchCriteria) => void
    loading: boolean
    fetching: boolean
    error: Error | null
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<ProductSearchResponseType, Error>>
}
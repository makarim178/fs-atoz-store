import type { UUID } from "crypto"

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
πd
type ProductSearchCriteria = {
    search?: string
    minPrice?: number | null
    maxPrice?: number | null
    page: number
    pageSize: number
}

type PostRequestType = {
    method: 'POST' | 'PUT' | 'DELETE',
    headers: DynamicObject
    body: string
}

type PaginationType = {
    totalCount: number
    currentPage: number
    pageSize: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}
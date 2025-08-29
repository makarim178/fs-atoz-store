import { DEFAULT_SEARCH_QUERY, REQUEST_HEADERS } from "@/constants/requestTypes"
import type { ProductSearchCriteria, ProductSearchResponseType } from "@/types/product"

async function searchProduct(requestBody: ProductSearchCriteria): Promise<ProductSearchResponseType>  {
    const requestOptions: PostRequestType = {
        method: 'POST',
        headers: REQUEST_HEADERS,
        body: JSON.stringify(requestBody)
    }
    const response = await fetch('http://localhost:5121/api/Products/search', requestOptions)
    return await response.json()
}

const destructureProductSearch = (searchQuery: string): ProductSearchCriteria => {
    if (!searchQuery) return DEFAULT_SEARCH_QUERY
    return JSON.parse(searchQuery)
}

export const productService = {
    searchProduct,
    destructureProductSearch
}
import { useState } from 'react'
import { DoubleSlider } from '../ui/doubleSlider/DoubleSlider'
import { ProductSearch } from './ProductSearch'
import type { ProductSearchCriteria } from '@/types/product'
import { PRICE_RANGE } from '@/constants/globalConstants'
import { DEFAULT_PAGE_SIZE } from '@/constants/requestTypes'
import { useProductContext } from '@/hooks/useProduct'
import type { QueryParamsType } from '@/types/props'

export const ProductFilterComponent = () => {
    const { setSearchQuery } = useProductContext()
    const [combQuery, setCombQuery] = useState<ProductSearchCriteria>({
        search: '',
        minPrice: PRICE_RANGE.MIN,
        maxPrice: PRICE_RANGE.MAX,
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE
    })

    const mutateQuery = (query: QueryParamsType) => {
        setCombQuery( prev => ({...prev, ...query}))
        setSearchQuery({ ...combQuery, ...query})
    }

    return (
        <div className="flex flex-col px-2 gap-4 ">
            <h3 className="text-lg font-semibold title-text-theme">Filters</h3>
            <ProductSearch mutateQuery={mutateQuery}/>
            <DoubleSlider mutateQuery={mutateQuery} />
        </div>
    )
}
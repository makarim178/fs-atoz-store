import type { PaginationType} from '@/types/product'
import { PageNumber } from './PageNumber'
import { useProductContext } from '@/hooks/useProduct'

type PageNumberType = {
    id: string, 
    pageNumber: number
}

export const Pagination = () => {
    const { pagination : { 
        totalCount,
        currentPage, 
        totalPages,
    } }: { pagination: PaginationType} = useProductContext()

    const pageNumerArr = (): PageNumberType[] => {
        const arr: PageNumberType[] = []
        for (let i = 1; i < totalPages + 1; i++) {
            arr.push({ id: `product-page-${i.toString().padStart(2,"0")}`, pageNumber: i})
        }
        return arr;
    }

    return (
        <div className="flex w-full justify-center content-center gap-4">
         {
            totalCount > 0 
                ? pageNumerArr().map((pageObject: PageNumberType) => (<PageNumber key={pageObject.id} pageNumber={pageObject.pageNumber} currentPage={currentPage}/>))
                : <h3 className="p-4 text-sm text-amber-950 dark:text-neutral-200">Could not find any products with current search terms.</h3>
         }   
        </div>
    )

}

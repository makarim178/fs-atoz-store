import { useProductContext } from "@/providers/ProductsContext"
import type { PaginationType} from "@/types/product"
import { PageNumber } from "./PageNumber"

type PageNumberType = {
    id: string, 
    pageNumber: number
}

export const Pagination = () => {
    const { pagination : { 
        currentPage, 
        totalPages,
    } }: { pagination: PaginationType} = useProductContext()

    const pageNumerArr = (): PageNumberType[] => {
        let arr: PageNumberType[] = []
        for (let i = 1; i < totalPages + 1; i++) {
            arr.push({ id: `product-page-${i.toString().padStart(2,"0")}`, pageNumber: i})
        }
        return arr;
    }

    return (
        <div className="flex w-full justify-center content-center gap-4">
         {
            pageNumerArr().map((pageObject: PageNumberType) => (<PageNumber key={pageObject.id} pageNumber={pageObject.pageNumber} currentPage={currentPage}/>))
         }   
        </div>
    )

}

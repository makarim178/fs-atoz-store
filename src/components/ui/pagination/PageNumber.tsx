import { useProductContext } from "@/providers/ProductsContext"

export const PageNumber =({ pageNumber, currentPage }: { pageNumber: number, currentPage: number}) => {

    const { searchQuery, setSearchQuery } = useProductContext()

    const isCurrentPage = () => pageNumber == currentPage
    const classNames = 'w-8 h-8 border-1 border-black flex content-center items-center text-center'
    const filterClassNames = () => isCurrentPage() ? `${classNames} bg-gray-700 text-white cursor-not-allowed`: `${classNames} cursor-pointer`
    const handleClick = (pageNumber: number) => {
        if (currentPage === pageNumber) return
        setSearchQuery({...searchQuery, page: pageNumber})
    }
    return (<div className={filterClassNames()} onClick={() => handleClick(pageNumber)}>
        <span className="content-center w-full h-full">{ pageNumber}</span>
    </div>)
}
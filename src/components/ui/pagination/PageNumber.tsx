import { useProductContext } from '@/hooks/useProduct'

export const PageNumber =({ pageNumber, currentPage }: { pageNumber: number, currentPage: number}) => {

    const { searchQuery, setSearchQuery } = useProductContext()

    const isCurrentPage = () => pageNumber == currentPage
    const classNames = 'w-8 h-8 border-1 border-black flex content-center items-center text-center rounded-xs'
    const filterClassNames = () => isCurrentPage() ? `${classNames} pagination-colors-current`: `${classNames} cursor-pointer pagination-colors`
    const handleClick = (pageNumber: number) => {
        if (currentPage === pageNumber) return
        setSearchQuery({...searchQuery, page: pageNumber})
    }
    return (<div className={filterClassNames()} onClick={() => handleClick(pageNumber)}>
        <span className="content-center w-full h-full">{ pageNumber}</span>
    </div>)
}
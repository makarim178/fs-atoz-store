
// import { useProductContext } from "@/hooks/useProduct";
import { memo, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
// import type { ProductSearchCriteria } from "@/types/product";
import type { ProductSearchPropsType } from "@/types/props";

export const ProductSearch = memo(({ mutateQuery }: ProductSearchPropsType) => {
    // const { searchQuery, setSearchQuery } = useProductContext()
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault()
        let searchTerm = e.target.value;
        setInputValue(searchTerm)
        mutateQuery({search: searchTerm.trim() })
    };

    return (
        <div className="flex items-center gap-2 bg-[#D9D9D9] px-4 py-1 pr-4 rounded-md">
            <SearchIcon />
            <input 
                type="text" 
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search" 
                className="focus:outline-none w-full p-1"
            />
        </div>
    )
})


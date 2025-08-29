
import { memo, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import type { ProductSearchPropsType } from "@/types/props";

export const ProductSearch = memo(({ mutateQuery }: ProductSearchPropsType) => {
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setInputValue(searchTerm)
        mutateQuery({search: searchTerm.trim() })
    };

    return (
        <div className="flex items-center gap-2 input-color-theme px-4 py-1 pr-4 rounded-md">
            <SearchIcon className="input-text-theme" />
            <input 
                type="text" 
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search" 
                className="focus:outline-none w-full p-1 input-text-theme"
            />
        </div>
    )
})


import { useProductContext } from "@/providers/ProductsContext"
import { memo, useState } from "react"

export const ProductSearch = memo(() => {
    const { searchQuery, setSearchQuery } = useProductContext()
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        let searchTerm = e.target.value;
        setInputValue(searchTerm)
        setSearchQuery({...searchQuery, search: searchTerm.trim()})
    };

    return (
        <div>
            <input 
                type="text" 
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search products..." 
            />
        </div>
    )
})
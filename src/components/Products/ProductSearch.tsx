import { useProductContext } from "@/providers/ProductsContext"
import { memo, useState } from "react"

export const ProductSearch = memo(() => {
    const { searchQuery, setSearchQuery } = useProductContext()
    const [inputValue, setInputValue] = useState("")
    const [priceRange, setPriceRange] = useState(searchQuery.maxPrice || 0)

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

            <input 
                type="range" 
                value={priceRange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
        </div>
    )
})
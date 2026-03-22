import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ( {children}) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange, setPriceRange] = useState({min:'', max:''});
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    const resetFilters = () => {
        setSelectedCategory('');
        setPriceRange({ min: '', max: '' });
        setSelectedBrands([]);
        setCurrentPage(1);
    }

    return (
        <FilterContext.Provider value={{
        selectedCategory, setSelectedCategory,
        priceRange, setPriceRange,
        selectedBrands, setSelectedBrands,
        currentPage, setCurrentPage,
        resetFilters,
        }}  > {children} </FilterContext.Provider>
    );

};

export const useFilters = () => useContext(FilterContext);

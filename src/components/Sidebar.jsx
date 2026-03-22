import { useEffect, useState } from 'react'
import { useFilters } from '../context/FilterContext'
import { fetchCategories } from '../api/products'

const Sidebar = ({ allProducts }) => {
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  const {
    selectedCategory, setSelectedCategory,
    priceRange, setPriceRange,
    selectedBrands, setSelectedBrands,
    setCurrentPage,
    resetFilters,
  } = useFilters()

  // Extract unique brands from current product list
  const availableBrands = [...new Set(
    allProducts
      .map(p => p.brand)
      .filter(Boolean)
  )].sort()

  // Fetch categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (err) {
        console.error('Failed to load categories', err)
      } finally {
        setCategoriesLoading(false)
      }
    }
    loadCategories()
  }, [])

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(prev => prev === categorySlug ? '' : categorySlug)
    setSelectedBrands([])
    setCurrentPage(1)
  }

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
    setCurrentPage(1)
  }

  const handlePriceChange = (field, value) => {
    setPriceRange(prev => ({ ...prev, [field]: value }))
    setCurrentPage(1)
  }

  const handleReset = () => {
    resetFilters()
  }

  return (
    <aside className="w-64 shrink-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-20">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800">Filters</h2>
          <button
            onClick={handleReset}
            className="text-xs text-yellow-600 hover:text-yellow-800 font-medium underline underline-offset-2"
          >
            Reset All
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Category</h3>
          {categoriesLoading ? (
            <p className="text-xs text-gray-400">Loading...</p>
          ) : (
            <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-yellow-400 text-gray-900 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Price Range</h3>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <span className="text-gray-400 text-sm">–</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Brand Filter */}
        {availableBrands.length > 0 && (
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Brand</h3>
            <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
              {availableBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900 py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="accent-yellow-400 w-4 h-4"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>
        )}

      </div>
    </aside>
  )
}

export default Sidebar
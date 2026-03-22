import { useEffect, useState, useMemo } from 'react'
import { fetchProducts, fetchProductsByCategory, fetchAllProducts } from '../api/products'
import { useFilters } from '../context/FilterContext'
import ProductCard from '../components/ProductCard'
import Sidebar from '../components/Sidebar'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

const PRODUCTS_PER_PAGE = 12

const ProductListingPage = () => {
  const [allFetchedProducts, setAllFetchedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const {
    selectedCategory,
    priceRange,
    selectedBrands,
    currentPage,
    setCurrentPage,
  } = useFilters()

  // Fetch products whenever category changes
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        let data
        if (selectedCategory) {
          data = await fetchProductsByCategory(selectedCategory, 100, 0)
        } else {
          data = await fetchAllProducts()
        }
        setAllFetchedProducts(data.products)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [selectedCategory])

  // Apply price + brand filters 
  const filteredProducts = useMemo(() => {
    let result = [...allFetchedProducts]

    if (priceRange.min !== '') {
      result = result.filter(p => p.price >= Number(priceRange.min))
    }
    if (priceRange.max !== '') {
      result = result.filter(p => p.price <= Number(priceRange.max))
    }
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand))
    }

    return result
  }, [allFetchedProducts, priceRange, selectedBrands])

  // Pagination 

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  // Reset to page 1 when filters cause product list to change
  useEffect(() => {
    setCurrentPage(1)
  }, [priceRange, selectedBrands])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        {!loading && (
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory ? ` in "${selectedCategory}"` : ''}
          </p>
        )}
      </div>

      <div className="flex gap-8">

        
        
        <Sidebar allProducts={allFetchedProducts} />

        {/* Main Content */}

        
        <div className="flex-1">
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : paginatedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <span className="text-6xl mb-4">🔍</span>
              <p className="text-lg font-medium">No products match your filters</p>
              <p className="text-sm mt-1">Try adjusting or resetting your filters</p>
            </div>
          ) : (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page =>
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 2
                    )
                    .reduce((acc, page, idx, arr) => {
                      if (idx > 0 && arr[idx - 1] !== page - 1) {
                        acc.push('...')
                      }
                      acc.push(page)
                      return acc
                    }, [])
                    .map((item, idx) =>
                      item === '...' ? (
                        <span key={`dots-${idx}`} className="px-2 text-gray-400">…</span>
                      ) : (
                        <button
                          key={item}
                          onClick={() => handlePageChange(item)}
                          className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                            currentPage === item
                              ? 'bg-yellow-400 text-gray-900 font-bold shadow-sm'
                              : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {item}
                        </button>
                      )
                    )
                  }

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductListingPage
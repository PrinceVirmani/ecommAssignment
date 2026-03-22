import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProductById } from '../api/products'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchProductById(id)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const renderStars = (rating) => {
    const full = Math.round(rating)
    return (
      <span className="text-yellow-400 text-xl">
        {'★'.repeat(full)}
        <span className="text-gray-300">{'★'.repeat(5 - full)}</span>
      </span>
    )
  }

  const getStockStatus = (stock) => {
    if (stock <= 0) return { label: 'Out of Stock', color: 'text-red-500 bg-red-50' }
    if (stock <= 10) return { label: `Only ${stock} left!`, color: 'text-orange-500 bg-orange-50' }
    return { label: 'In Stock', color: 'text-green-600 bg-green-50' }
  }

  if (loading) return <div className="max-w-7-xl mx-auto px-4 py-12"><Loader /></div>
  if (error) return <div className="max-w-7-xl mx-auto px-4 py-12"><ErrorMessage message={error} /></div>
  if (!product) return null

  const stockStatus = getStockStatus(product.stock)

  return (
    <div className="max-w-7-xl mx-auto px-4 py-8">


      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-8 group transition"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Products
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

  
          <div className="p-8 bg-gray-50 flex flex-col gap-4">

            <div className="w-full aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center border border-gray-100">
              <img
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={product.title}
                className="object-contain h-full w-full p-6"
              />
            </div>


            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx
                        ? 'border-yellow-400 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>


          <div className="p-8 flex flex-col gap-5">


            <div className="flex gap-2 flex-wrap">
              {product.category && (
                <span className="text-xs font-semibold uppercase tracking-widest text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              )}
              {product.brand && (
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {product.brand}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 leading-snug">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-500 font-medium">{product.rating} / 5</span>
              {product.reviews?.length > 0 && (
                <span className="text-sm text-gray-400">({product.reviews.length} reviews)</span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-gray-900">${product.price}</span>
              {product.discountPercentage && (
                <>
                  <span className="text-lg text-gray-400 line-through mb-1">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mb-1">
                    {product.discountPercentage.toFixed(1)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${stockStatus.color}`}>
                {stockStatus.label}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>

          {product.reviews?.length > 0 && (
            <div className="border-t border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Reviews
                </h3>

                <div className="space-y-6">
                {product.reviews.map((review, idx) => (
                    <div key={idx}>
                    
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-800">
                        {review.reviewerName}
                        </span>

                        <span className="text-yellow-400 text-sm">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                        </span>

                        <span className="text-gray-500 text-sm">
                        ({review.rating.toFixed(1)})
                        </span>
                    </div>

                    {/* Comment */}
                    <p className="text-gray-600 mt-2 leading-relaxed">
                        {review.comment}
                    </p>

                    </div>
                ))}
                </div>
            </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductDetailPage
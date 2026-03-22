import { useNavigate } from 'react-router-dom';
import React from 'react'

const ProductCard = ({product}) => {
    const navigate = useNavigate();

    const renderStars = (rating) => {
        return '★'.repeat(Math.round(rating))+ '☆' .repeat(5 - Math.round(rating));
    }
    
    return (
        <div 
        onClick={()=> navigate(`/product/${product.id}`)} 
        className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-y-lime-300 hover:-translate-y-1 overflow-hidden group'
        >
            <div className='h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-4'>
                <img 
                src={product.thumbnail} 
                alt={product.title} 
                className='h-full object-contain group-hover:scale-105 transition-transform duration-200' />
            </div>

            <div className='p-4'>
                
                <p className='text-xs text-gray-400 uppercase tracking-wide mb-1'>
                    {product.brand || product.category}
                </p>

                <h3 className='font-semibold text-gray-800 text-sm leading-tight line-clamp-2 mb-2'>
                    {product.title}
                </h3>

                <div className='flex items-center justify-between mt-auto'>

                    <span className='text-lg font-bold text-gray-900'>
                        ${product.price}
                    </span>

                    <span 
                    className='text-yellow-500 text-sm'
                    title={`Rating: ${product.rating}`}
                    >
                        {renderStars(product.rating)}
                    </span>
                </div>

                {product.discountPercentage && (
                    <p className='text-xs text-green-600 font-medium mt-1'>
                        {product.discountPercentage.toFixed(1)}% off
                    </p>
                )}
            </div>
        </div>
  )
}

export default ProductCard
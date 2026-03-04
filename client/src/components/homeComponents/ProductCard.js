import React from 'react'

const ProductCard = ({ item }) => {
  return (
      <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300"
          >
            {/* Image */}
            <div className="h-56 bg-gray-50 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-48 object-contain"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-sm text-gray-700 mb-2">
                {item.name}
              </h3>

              <div className="flex items-center gap-2 mb-4">
                <span className="font-semibold text-gray-900">
                  Rs.{item.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  Rs.{item.oldPrice}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <button className="bg-gray-200 text-sm px-4 py-2 rounded-md hover:bg-gray-300 transition">
                  Add to Cart
                </button>
                <button className="text-gray-500 text-lg">♡</button>
              </div>
            </div>
          </div>
  )
}

export default ProductCard

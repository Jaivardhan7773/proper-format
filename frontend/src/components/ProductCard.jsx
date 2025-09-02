import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-52 object-contain mb-3"
      />

      {/* Variants */}
      {product.variants?.length > 0 && (
        <div className="flex gap-2 mb-2">
          {product.variants.map((variant, idx) => (
            <span
              key={idx}
              className="w-4 h-4 rounded-full border border-gray-400"
              style={{ backgroundColor: variant }}
            ></span>
          ))}
        </div>
      )}

      {/* Brand + Title */}
      <h3 className="font-semibold text-gray-800">{product.brand}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{product.title}</p>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-1">
        <span className="text-sm text-gray-700">{product.rating}</span>
        <div className="flex text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(product.rating) ? "fill-yellow-500" : ""}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">({product.reviews})</span>
      </div>

      {/* Price Section */}
      <div className="mt-2">
        <span className="text-lg font-bold text-gray-900">
          ₹{product.price}
        </span>
        <span className="text-sm text-gray-500 line-through ml-2">
          ₹{product.mrp}
        </span>
        <span className="text-sm text-green-600 ml-2">
          ({product.discount}% off)
        </span>
      </div>

      {/* Delivery Info */}
      <p className="text-xs text-gray-600 mt-1">{product.delivery}</p>

      {/* Button */}
      <button className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg font-medium">
        Add to cart
      </button>
    </div>
  );
}

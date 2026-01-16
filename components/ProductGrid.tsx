import React, { useState } from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
  title: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, addToCart, title }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-500">{products.length} items found</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; onAdd: (p: Product, q: number) => void }> = ({ product, onAdd }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-card group bg-white rounded-2xl border border-gray-100 p-3 flex flex-col hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-md z-10 shadow-sm">
          {product.badge}
        </span>
      )}
      
      {/* Discount Badge */}
      {product.originalPrice && (
        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-sm">
          Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
        </span>
      )}

      {/* Image */}
      <div className="relative aspect-square mb-3 overflow-hidden rounded-xl bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
          loading="lazy"
        />
        <button className="absolute bottom-2 right-2 bg-white/90 backdrop-blur rounded-full p-2 shadow-sm text-gray-500 hover:text-red-500 transition-colors">
            <Star size={16} />
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-gray-900 line-clamp-1 text-lg group-hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 h-10 leading-snug">
          {product.description}
        </p>

        {/* Price & Weight */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-xs text-gray-500 font-medium">/ {product.unit}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <div className="relative flex-grow">
               <select 
                className="weight-selector w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow cursor-pointer font-medium"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                <option value={1}>1 {product.unit}</option>
                <option value={2}>2 {product.unit}s</option>
                <option value={3}>3 {product.unit}s</option>
                <option value={5}>5 {product.unit}s</option>
              </select>
            </div>
            
            <button 
              onClick={handleAdd}
              disabled={isAdded}
              className={`
                flex items-center justify-center w-12 h-10 rounded-lg transition-all duration-200 shadow-sm
                ${isAdded 
                  ? 'bg-green-600 text-white' 
                  : 'bg-brand-500 hover:bg-brand-600 text-white'
                }
              `}
            >
              {isAdded ? <Check size={20} /> : <Plus size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

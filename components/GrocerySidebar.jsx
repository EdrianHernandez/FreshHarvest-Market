import React, { useState } from 'react';
import { 
  Apple, 
  Carrot, 
  Milk, 
  Croissant, 
  Beef, 
  Package, 
  Store, 
  ChevronDown, 
  ChevronUp,
  Menu
} from 'lucide-react';
import { CATEGORIES } from '../constants';

const iconMap = {
  Apple,
  Carrot,
  Milk,
  Croissant,
  Beef,
  Package,
  Store
};

export const GrocerySidebar = ({ 
  selectedCategory, 
  onSelectCategory,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside className={`bg-white border-r border-gray-100 flex-shrink-0 transition-all duration-300 ${className}`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-50 mb-2">
        <h2 className={`font-serif font-bold text-xl text-brand-900 ${!isExpanded ? 'lg:hidden' : ''}`}>
          Categories
        </h2>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <nav className={`p-2 space-y-1 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon] || Store;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`
                category-item w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200
                ${isSelected 
                  ? 'bg-brand-50 text-brand-700 font-semibold shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon size={20} className={isSelected ? 'text-brand-600' : 'text-gray-400'} />
              <span className="capitalize">{cat.name}</span>
            </button>
          );
        })}
      </nav>

      <div className={`mt-8 p-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <h3 className="text-orange-800 font-serif font-bold mb-1">Free Delivery</h3>
          <p className="text-orange-600 text-sm mb-3">On your first order over $50.</p>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors">
            Start Shopping
          </button>
        </div>
      </div>
    </aside>
  );
};

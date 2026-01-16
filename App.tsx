import React, { useState, useMemo } from 'react';
import { GrocerySidebar } from './components/GrocerySidebar';
import { ProductGrid } from './components/ProductGrid';
import { WeeklyDeals } from './components/WeeklyDeals';
import { CartSummary } from './components/CartSummary';
import { CategoryId, Product, CartItem } from './types';
import { PRODUCTS, WEEKLY_DEALS } from './constants';
import { Search, ShoppingBasket, Menu, User, Bell } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = selectedCategory === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === selectedCategory);
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return result;
  }, [selectedCategory, searchQuery]);

  // Cart Actions
  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    // Optional: Open cart on mobile when adding first item
    if (window.innerWidth < 1280 && cartItems.length === 0) {
        setIsMobileCartOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200">
               <ShoppingBasket size={24} />
            </div>
            <h1 className="text-xl lg:text-2xl font-serif font-bold text-gray-900 tracking-tight hidden sm:block">
              FreshHarvest<span className="text-brand-500">.</span>
            </h1>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search for apples, milk, bread..." 
                className="w-full bg-gray-100 border-none rounded-xl py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors" size={20} />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors relative hidden sm:block">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors hidden sm:block">
              <User size={24} />
            </button>
            
            <button 
              className="xl:hidden relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMobileCartOpen(true)}
            >
              <div className="bg-brand-100 p-2 rounded-full">
                <ShoppingBasket size={24} className="text-brand-700" />
              </div>
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartItems.reduce((a,b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-[1600px] mx-auto w-full items-start">
        {/* Sidebar */}
        <GrocerySidebar 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory}
          className="w-64 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto hidden lg:block"
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 min-w-0">
          <div className="mb-6 lg:hidden overflow-x-auto pb-2 -mx-4 px-4 flex gap-2 scrollbar-hide">
            {/* Mobile Category Chips could go here if needed, but sidebar handles desktop. 
                For strict adherence to prompt structure, Sidebar is main nav. 
            */}
          </div>

          {selectedCategory === 'all' && !searchQuery && (
            <WeeklyDeals />
          )}

          <ProductGrid 
            products={filteredProducts} 
            addToCart={addToCart}
            title={selectedCategory === 'all' ? (searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Items') : `Fresh ${selectedCategory}`}
          />
        </main>

        {/* Cart Summary */}
        <CartSummary 
          cartItems={cartItems} 
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          isOpen={isMobileCartOpen}
          onClose={() => setIsMobileCartOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;

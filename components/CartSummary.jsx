import React, { useMemo } from 'react';
import { ShoppingBag, X, Trash2, ArrowRight } from 'lucide-react';

/**
 * CartSummary Component
 * Displays the current items in the shopping cart, calculates subtotal, 
 * delivery fees, and total price.
 */
export const CartSummary = ({ 
  cartItems, 
  onRemove, 
  isOpen, 
  onClose,
  onUpdateQuantity
}) => {
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const deliveryFee = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + deliveryFee;

  return (
    <>
      {/* Overlay for mobile/tablet */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 xl:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside 
        className={`
          fixed top-0 right-0 h-screen bg-white z-50 border-l border-gray-200 flex flex-col
          transition-transform duration-300 ease-in-out shadow-2xl w-full sm:w-96
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          xl:translate-x-0 xl:static xl:h-[calc(100vh-80px)] xl:shadow-none xl:border-l xl:w-80 xl:sticky xl:top-20
        `}
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-brand-600" size={24} />
            <h2 className="font-serif font-bold text-xl text-gray-900">My Cart</h2>
            <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 xl:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 space-y-3">
              <ShoppingBag size={48} className="opacity-20" />
              <p className="font-medium">Your basket is empty</p>
              <p className="text-sm">Start adding fresh produce to see them here.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 group hover:border-brand-200 transition-colors">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-lg object-cover bg-white"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900 truncate pr-2" title={item.name}>
                      {item.name}
                    </h4>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">${item.price.toFixed(2)} / {item.unit}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm h-7">
                      <button 
                        className="w-7 h-full flex items-center justify-center text-gray-500 hover:text-brand-600 hover:bg-gray-50 rounded-l-lg transition-colors"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-gray-900">{item.quantity}</span>
                      <button 
                        className="w-7 h-full flex items-center justify-center text-gray-500 hover:text-brand-600 hover:bg-gray-50 rounded-r-lg transition-colors"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-sm text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-white">
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                  {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-orange-500 text-right">
                  Add ${(50 - subtotal).toFixed(2)} for free delivery
                </p>
              )}
              <div className="flex justify-between text-lg font-serif font-bold text-gray-900 pt-2 border-t border-dashed border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-200 transition-all flex items-center justify-center gap-2">
              Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

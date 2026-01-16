/**
 * CATEGORIES
 * An array of available shopping categories with their associated icons.
 */
export const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'Store' },
  { id: 'fruits', name: 'Fresh Fruits', icon: 'Apple' },
  { id: 'vegetables', name: 'Vegetables', icon: 'Carrot' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: 'Milk' },
  { id: 'bakery', name: 'Bakery', icon: 'Croissant' },
  { id: 'meat', name: 'Meat & Seafood', icon: 'Beef' },
  { id: 'pantry', name: 'Pantry', icon: 'Package' },
];

/**
 * PRODUCTS
 * The full catalog of items available in the market.
 */
export const PRODUCTS = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 0.69,
    unit: 'lb',
    category: 'fruits',
    image: 'https://picsum.photos/400/400?random=1',
    description: 'Sweet and creamy organic bananas, perfect for baking or snacking.',
    badge: 'Organic'
  },
  {
    id: '2',
    name: 'Red Delicious Apples',
    price: 1.29,
    unit: 'lb',
    category: 'fruits',
    image: 'https://picsum.photos/400/400?random=2',
    description: 'Crisp and sweet red apples freshly picked from local orchards.',
  },
  {
    id: '3',
    name: 'Avocado',
    price: 1.99,
    unit: 'each',
    category: 'vegetables',
    image: 'https://picsum.photos/400/400?random=3',
    description: 'Ripe and ready-to-eat hass avocados. Creamy texture.',
    originalPrice: 2.50
  },
  {
    id: '4',
    name: 'Whole Milk',
    price: 3.49,
    unit: 'gal',
    category: 'dairy',
    image: 'https://picsum.photos/400/400?random=4',
    description: 'Farm fresh whole milk, rich in calcium and vitamin D.',
  },
  {
    id: '5',
    name: 'Sourdough Bread',
    price: 4.99,
    unit: 'loaf',
    category: 'bakery',
    image: 'https://picsum.photos/400/400?random=5',
    description: 'Artisanal sourdough bread baked fresh daily with a crispy crust.',
    badge: 'Best Seller'
  },
  {
    id: '6',
    name: 'Cage-Free Eggs',
    price: 4.29,
    unit: 'dz',
    category: 'dairy',
    image: 'https://picsum.photos/400/400?random=6',
    description: 'Large brown cage-free eggs from happy hens.',
    originalPrice: 5.49
  },
  {
    id: '7',
    name: 'Fresh Spinach',
    price: 2.99,
    unit: 'bag',
    category: 'vegetables',
    image: 'https://picsum.photos/400/400?random=7',
    description: 'Pre-washed baby spinach leaves. Ready for salads.',
    badge: 'Local'
  },
  {
    id: '8',
    name: 'Ground Beef (80/20)',
    price: 5.99,
    unit: 'lb',
    category: 'meat',
    image: 'https://picsum.photos/400/400?random=8',
    description: 'Premium ground beef, perfect for burgers and tacos.',
  },
  {
    id: '9',
    name: 'Strawberries',
    price: 3.99,
    unit: 'lb',
    category: 'fruits',
    image: 'https://picsum.photos/400/400?random=9',
    description: 'Sweet, red, and juicy strawberries. Packed with Vitamin C.',
    originalPrice: 4.99
  },
  {
    id: '10',
    name: 'French Baguette',
    price: 2.49,
    unit: 'each',
    category: 'bakery',
    image: 'https://picsum.photos/400/400?random=10',
    description: 'Classic French baguette with a soft interior and crusty exterior.',
  },
  {
    id: '11',
    name: 'Almond Milk',
    price: 3.79,
    unit: 'carton',
    category: 'dairy',
    image: 'https://picsum.photos/400/400?random=11',
    description: 'Unsweetened almond milk. A great dairy-free alternative.',
  },
  {
    id: '12',
    name: 'Broccoli Crowns',
    price: 1.49,
    unit: 'lb',
    category: 'vegetables',
    image: 'https://picsum.photos/400/400?random=12',
    description: 'Fresh broccoli crowns, rich in fiber and nutrients.',
  }
];

export const WEEKLY_DEALS = PRODUCTS.filter(p => p.originalPrice);

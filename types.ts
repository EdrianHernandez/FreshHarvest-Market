export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  description: string;
  badge?: string;
  originalPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export type CategoryId = 'all' | 'fruits' | 'vegetables' | 'dairy' | 'bakery' | 'meat' | 'pantry';

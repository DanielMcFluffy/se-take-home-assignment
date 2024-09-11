export type Status = 'pending' | 'complete' | 'error';

export type Order = {
  id: number;
  name: string;
  price: number;
  type: 'normal' | 'vip';
  status: Status;
  details: OrderItem[];
};

export type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: 'food' | 'drink' | 'other';
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: 'food' | 'drink' | 'other';
};


export type Customer = {
  id: number;
  type: 'normal' | 'vip';
  order: Order;
};
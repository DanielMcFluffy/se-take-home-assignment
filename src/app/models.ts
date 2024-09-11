export type Status = 'pending' | 'complete' | 'error';

export type Order = {
  id: number;
  name: string;
  price: number;
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

export type MenuItem = Omit<OrderItem, 'quantity'>;

export type Queue = {
  id: number;
  orders: Order[];
  vip: boolean;
};

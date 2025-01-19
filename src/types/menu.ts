export interface MenuItem {
    _id: string;
    title: string;
    description?: string;
    price: number;
    imageUrl?: string;
    category: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
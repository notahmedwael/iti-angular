export interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    discountPercentage?: number;
    rating: number;
    description: string;
    stock: number;
    image: string;
}
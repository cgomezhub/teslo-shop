import Image from 'next/image';


export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    //todo: type: Types;
    gender: Category;
}

export interface CartProduct{
    id: string;
    title: string;
    quantity: number;
    slug: string;
    size: Size;
    price: number;
    image: string;
}

export interface ProductImage {
    id: number;
    url: string;
    productId?: string;
}

type Category = 'men'|'women'|'kid'|'unisex'
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Types = 'shirts'|'pants'|'hoodies'|'hats';
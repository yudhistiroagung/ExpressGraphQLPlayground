import { Product } from '../schema';
import { delay } from '../util';
import { Service } from 'typedi';

const initialDummyData: Product[] = [
    {
        id: '123',
        name: 'Nasi Goreng',
        unitCost: 7000,
        price: 12000,
    },
    {
        id: '124',
        name: 'Ayam Goreng',
        unitCost: 8000,
        price: 13000,
    },
];

@Service()
export class ProductService {
    private products: Product[] = [...initialDummyData];

    public async getProducts(): Promise<Product[]> {
        await delay();
        return this.products;
    }

    public async getProduct(id: string): Promise<Product> {
        await delay();
        const idx = this.findIndex(id);
        return this.products[idx];
    }

    public async addProduct(payload: Omit<Product, 'id'>): Promise<Product> {
        const id: string = Date.now().toString();
        const product: Product = {
            id,
            ...payload,
        };
        this.products.push(product);
        await delay(500);
        return product;
    }

    public async updateProduct(product: Product): Promise<Product> {
        await delay(500);
        const idx: number = this.findIndex(product.id);
        this.products[idx] = product;
        return product;
    }

    public async deleteProduct(id: string): Promise<void> {
        await delay(500);
        const idx: number = this.findIndex(id);
        this.products.splice(idx, 1);
    }

    private findIndex(id: string): number {
        const idx =  this.products.findIndex((p: Product) => p.id === id);
        if (idx < 0)
            throw new Error(`Product with id ${id} not found!`);
        return idx;
    }
}
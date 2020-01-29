import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import { Product, ProductInput } from '../schema';

const fakeProducts: Product[] = [
    {
        id: '1',
        name: 'Ayam Goreng',
        unitCost: 7000,
        price: 13000,
    },
    {
        id: '2',
        name: 'Rendang Sapi',
        unitCost: 10000,
        price: 15000,
    }
];

@Resolver(Product)
export class ProductResolver {

    @Query(() => [Product])
    public async products(): Promise<Product[]> {
        return fakeProducts;
    }

    @Mutation(() => Product)
    async createProduct(
        @Arg('input', () => ProductInput!) input: ProductInput,
    ): Promise<Product> {
        const id: string = Date.now().toString();
        const addedProduct = {
            ...input,
            id,
        }
        fakeProducts.push(addedProduct);
        return addedProduct;
    }

    @Mutation(() => Product)
    async updateProduct(
        @Arg('id', () => String!) id: string,
        @Arg('input', () => ProductInput) input: ProductInput,
    ): Promise<Product> {
        const idx = this.findIndexOrThrowError(id);
        fakeProducts[idx] = {
            ...fakeProducts[idx],
            ...input,
        };
        return fakeProducts[idx];
    }

    @Mutation(() => Boolean)
    async delete(@Arg('id', () => String!) id: string) {
        const idx = this.findIndexOrThrowError(id);
        fakeProducts.splice(idx, 1);
        return true;
    }

    private findIndexOrThrowError(id: string): number {
        const idx = fakeProducts.findIndex((p: Product) => p.id === id);
        if (idx < 0)
            throw new Error(`Product with id ${id} not found!`);
        return idx;
    }

}
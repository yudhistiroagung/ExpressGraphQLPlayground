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

}
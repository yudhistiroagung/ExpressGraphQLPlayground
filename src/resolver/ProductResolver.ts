import { Resolver, Query } from 'type-graphql';

import { Product } from '../schema/Product';

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
]

@Resolver()
export class ProductResolver {
    @Query(() => [Product])
    public async products() {
        return fakeProducts;
    }
}
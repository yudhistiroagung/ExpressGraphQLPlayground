import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import { Product, ProductInput } from '../schema';
import { ProductService } from '../service';

@Resolver(Product)
export class ProductResolver {

    constructor(
        private readonly productService: ProductService,
    ) { }

    @Query(() => [Product])
    async products(): Promise<Product[]> {
        return this.productService.getProducts();
    }

    @Query(() => Product)
    async product(@Arg('id', () => String!) id: string): Promise<Product> {
        return this.productService.getProduct(id);
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
        return this.productService.addProduct(addedProduct);
    }

    @Mutation(() => Product)
    async updateProduct(
        @Arg('id', () => String!) id: string,
        @Arg('input', () => ProductInput!) input: ProductInput,
    ): Promise<Product> {
        const updatedProduct = {
            ...input,
            id,
        }
        return this.productService.updateProduct(updatedProduct)
    }

    @Mutation(() => Boolean)
    async delete(@Arg('id', () => String!) id: string) {
        await this.productService.deleteProduct(id);
        return true;
    }

}
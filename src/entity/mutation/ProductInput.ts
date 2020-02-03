import {
    Int,
    Field,
    InputType,
} from 'type-graphql';

@InputType({ description: 'New product object' })
export class ProductInput {
    @Field(() => String)
    name: string;

    @Field(() => Int)
    unitCost: number;

    @Field(() => Int)
    price: number;
}
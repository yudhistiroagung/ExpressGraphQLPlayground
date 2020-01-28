import {
    Field,
    Int,
    ObjectType,
} from 'type-graphql';

@ObjectType()
export class Product {
    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => Int)
    unitCost: number;

    @Field(() => Int)
    price: number;
}
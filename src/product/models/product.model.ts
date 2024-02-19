import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductModel {
  @Field()
  id: string;

  @Field({ nullable: false, description: 'Name of the product' })
  name: string;

  @Field({ nullable: false, description: 'price of product' })
  price: number;

  @Field({
    nullable: false,
    description: 'quantity available of the product in store',
  })
  stock: number;
}

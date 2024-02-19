import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Model } from 'mongoose';
import { Product } from '../documents/Product';
import { PRODUCT_MODEL } from 'src/constants/constants';
import { MongoDBService } from '../services';
import { ProductModel } from '../models';
import { CreateProductInput } from '../inputs';

@Resolver()
export class ProductResolver {
  constructor(
    @Inject(PRODUCT_MODEL) private productModel: Model<Product>,
    private mongoDBService: MongoDBService,
  ) {}

  @Query(() => [ProductModel])
  async allProducts() {
    const products: Product[] = await this.productModel.find().exec();
    return products.map((product: Product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
    }));
  }

  @Query(() => ProductModel)
  async product(@Args('id', { type: () => String }) id: string) {
    const productFromDB = await this.productModel.findById(id);
    return {
      id: productFromDB.id,
      name: productFromDB.name,
      price: productFromDB.price,
      stock: productFromDB.stock,
    };
  }

  @Mutation(() => ProductModel)
  async create(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    const savedProduct = await new this.productModel({
      ...createProductInput,
    }).save();

    return {
      id: savedProduct.id,
      name: savedProduct.name,
      price: savedProduct.price,
      stock: savedProduct.stock,
    };
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PRODUCT_MODEL } from 'src/constants/constants';
import { Product } from '../documents/Product';
import { CreateProductRequest } from '../requests';
import { MongoDBService } from './mongodb.service';
import mongoose from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_MODEL) private productModel: Model<Product>,
    private mongoDBService: MongoDBService,
  ) {}

  async create(createProductRequest: CreateProductRequest): Promise<Product> {
    const createdProduct = new this.productModel(createProductRequest);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string) {
    const objectId: mongoose.Types.ObjectId =
      this.mongoDBService.castStringToMongoId(id);
    return this.productModel.findById(objectId);
  }
}

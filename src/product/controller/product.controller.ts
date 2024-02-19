import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from '../services';
import { Product } from '../documents/Product';
import { CreateProductRequest } from '../requests';
import { ProductResponse } from '../responses';

@Controller('products')
export class ProductController {
  constructor(readonly service: ProductService) {}

  @Get()
  async findAllProducts(): Promise<ProductResponse[]> {
    const productsFromDB: Product[] = await this.service.findAll();
    const response: ProductResponse[] = [];

    productsFromDB.forEach((product: Product) => {
      response.push({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
      });
    });

    return response;
  }

  @Get(':id')
  async findProductById(@Param('id') id: string): Promise<ProductResponse> {
    const productFromDB: Product = await this.service.findById(id);

    return {
      id: productFromDB.id,
      name: productFromDB.name,
      price: productFromDB.price,
      stock: productFromDB.stock,
    };
  }

  @Post()
  async createProduct(
    @Body() createProductRequest: CreateProductRequest,
  ): Promise<ProductResponse> {
    const savedProduct: Product =
      await this.service.create(createProductRequest);

    return {
      id: savedProduct.id,
      name: savedProduct.name,
      price: savedProduct.price,
      stock: savedProduct.stock,
    };
  }
}

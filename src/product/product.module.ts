import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { MongoDBService, ProductService } from './services';
import { productProviders } from './providers/product.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ProductResolver } from './resolver';

@Module({
  imports: [DatabaseModule],
  exports: [ProductService, ProductResolver, ...productProviders],
  controllers: [ProductController],
  providers: [
    ProductService,
    MongoDBService,
    ProductResolver,
    ...productProviders,
  ],
})
export class ProductModule {}

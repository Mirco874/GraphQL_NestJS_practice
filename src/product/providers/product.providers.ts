import { Connection } from 'mongoose';
import { ProductSchema } from '../Schemas';
import { DATABASE_CONNECTION, PRODUCT_MODEL } from 'src/constants/constants';

export const productProviders = [
  {
    provide: PRODUCT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Product', ProductSchema),
    inject: [DATABASE_CONNECTION],
  },
];

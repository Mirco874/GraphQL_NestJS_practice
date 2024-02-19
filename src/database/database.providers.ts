import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from 'src/constants/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://inqcoffee:none@mycluster.pxjt9my.mongodb.net/inqcoffee',
      ),
  },
];

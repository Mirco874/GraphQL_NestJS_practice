import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class MongoDBService {
  constructor() {}

  castStringToMongoId(mongoIdString: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(mongoIdString);
  }
}

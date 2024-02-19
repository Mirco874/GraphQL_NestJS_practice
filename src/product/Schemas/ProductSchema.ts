import { Schema } from 'mongoose';
import { IProduct } from '../interfaces';

export const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
});

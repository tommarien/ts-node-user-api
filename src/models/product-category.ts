import { Schema, Document, model, SchemaTimestampsConfig } from 'mongoose';
import { TimeStamps } from './timestamps';

const schema = new Schema(
  {
    code: {
      type: String,
      uppercase: true,
      unique: true,
    },
    name: String,
    description: String,
  },
  { timestamps: true },
);

export interface ProductCategoryModel extends Document, TimeStamps {

  /**
   * The code of the category, unique (uppercase)
   * @type {string}
   * @memberof ProductCategoryModel
   */
  code: string;
  name: string;
  description?: string;
}

export const productCategory = model<ProductCategoryModel>('ProductCategory', schema);

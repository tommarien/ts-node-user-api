import { Schema, Document, model, SchemaTimestampsConfig } from 'mongoose';
import { Auditable } from './auditable';

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

export interface ProductCategoryModel extends Document, Auditable {

  /**
   * The code of the category, unique (uppercase)
   * @type {string}
   * @memberof ProductCategoryModel
   */
  code: string;
  name: string;
  description?: string;
}

const productCategory = model<ProductCategoryModel>('ProductCategory', schema);

export default productCategory;

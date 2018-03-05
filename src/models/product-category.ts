import { Document, model, Schema, Types } from 'mongoose';
import * as paginate from 'mongoose-paginate';
import { IAuditable } from './auditable';

const schema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      uppercase: true,
    },
    description: String,
    name: String,
  },
  { timestamps: true },
);

export interface IProductCategoryModel extends Document, IAuditable {
  _id: Types.ObjectId;
  /**
   * The code of the category, unique (uppercase)
   * @type {string}
   * @memberof ProductCategoryModel
   */
  code: string;
  name: string;
  description?: string;
}

schema.plugin(paginate);

const productCategory = model<IProductCategoryModel>('ProductCategory', schema);

export default productCategory;

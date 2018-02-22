import { IMapper, ObjectMapper } from './mapper';

const propertyMap = {
  _id: 'id',
  code: 'code',
  description: 'description',
  name: 'name',
};

const productCategoryMapper: IMapper = new ObjectMapper(propertyMap);

export default productCategoryMapper;

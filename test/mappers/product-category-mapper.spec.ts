import { expect } from 'chai';
import { IMapper } from '../../src/mappers/mapper';
import productCategoryMapper from '../../src/mappers/product-category-mapper';
import productCategory, { IProductCategoryModel } from '../../src/models/product-category';
import * as productCategoryMother from '../mothers/product-category-mother';

describe('Product Category Mapper', () => {
  let mobilePhones: IProductCategoryModel;

  beforeEach(() => {
    mobilePhones = productCategoryMother.mobilePhones();
  });

  it('it maps the id', () => {
    const mapped = productCategoryMapper.map(mobilePhones);
    expect(mapped).to.have.a.property('id').that.eq(mobilePhones._id);
  });

  it('it maps the code', () => {
    const mapped = productCategoryMapper.map(mobilePhones);
    expect(mapped).to.have.a.property('code').that.eq(mobilePhones.code);
  });

  it('it maps the description', () => {
    const mapped = productCategoryMapper.map(mobilePhones);
    expect(mapped).to.have.a.property('description').that.eq(mobilePhones.description);
  });

  it('it maps the name', () => {
    const mapped = productCategoryMapper.map(mobilePhones);
    expect(mapped).to.have.a.property('name').that.eq(mobilePhones.name);
  });

});

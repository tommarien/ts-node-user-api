import { expect } from 'chai';
import * as request from 'supertest';
import app from '../../../src/app';

import productCategory, { IProductCategoryModel } from '../../../src/models/product-category';
import dbHelper from '../../db-helper';

const RESOURCE_URI = 'product-categories';

describe(`GET /api/${RESOURCE_URI}/:id`, () => {
  let mobilePhones: IProductCategoryModel;

  before(() => dbHelper.connect());

  beforeEach(() => dbHelper.dropCollection(productCategory));

  beforeEach(() => {
    mobilePhones = new productCategory();
    mobilePhones.code = 'MOBPHO';
    mobilePhones.name = 'Mobile Phones';
    mobilePhones.description = 'Everything concerning mobile phones';
    return mobilePhones.save();
  });

  function act(id: string = mobilePhones.id) {
    return request(app)
      .get(`/api/${RESOURCE_URI}/:id`.replace(':id', id));
  }

  it('it returns status 200', () => {
    return act().expect(200);
  });

  it('it sets content-type to application/json', () => {
    return act().expect('Content-Type', /application\/json/);
  });

  after(() => dbHelper.disconnect());
});

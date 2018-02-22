import { Types as MongooseTypes } from 'mongoose';
import * as request from 'supertest';
import app from '../../../src/app';

import productCategoryMapper from '../../../src/mappers/product-category-mapper';
import productCategory, { IProductCategoryModel } from '../../../src/models/product-category';
import dbHelper from '../../db-helper';
import * as productCategoryMother from '../../mothers/product-category-mother';

const RESOURCE_URI = 'product-categories';

describe(`GET /api/${RESOURCE_URI}/:id`, () => {
  let mobilePhones: IProductCategoryModel;

  before(() => dbHelper.connect());

  beforeEach(() => dbHelper.dropCollection(productCategory));

  beforeEach(() => {
    mobilePhones = productCategoryMother.mobilePhones();
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

  it('it returns the category as resource', () => {
    const resource = JSON.parse(JSON.stringify(productCategoryMapper.map(mobilePhones)));

    return act()
      .expect(resource);
  });

  describe('HTTP 1.1 404 Not Found', () => {
    function resourceNotFound(id: string) {
      return {
        error: 'Not Found',
        message: `The 'ProductCategory' is not found (id:'${id}')`,
        statusCode: 404,
      };
    }

    it('it return the status if the category not exists', () => {
      const nonExistantId = MongooseTypes.ObjectId().toString();
      return act(nonExistantId).expect(404, resourceNotFound(nonExistantId));
    });

    it('it return the status if id is not an objectid', () => {
      const notObjectIdId = 'test';
      return act(notObjectIdId).expect(404, resourceNotFound(notObjectIdId));
    });
  });

  after(() => dbHelper.disconnect());
});

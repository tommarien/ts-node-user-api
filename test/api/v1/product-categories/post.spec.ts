import { expect, use } from 'chai';
import * as chaiThings from 'chai-things';
use(chaiThings);

import * as request from 'supertest';
import app from '../../../../src/app';
import productCategoryMapper from '../../../../src/mappers/product-category-mapper';
import productCategory from '../../../../src/models/product-category';
import dbHelper from '../../../db-helper';
import * as productCategoryMother from '../../../mothers/product-category-mother';

const RESOURCE_URI = 'product-categories';

describe(`POST /api/v1/${RESOURCE_URI}`, () => {
  let resource: any;

  before(() => dbHelper.connect());

  beforeEach(() => dbHelper.dropCollection(productCategory));
  beforeEach(() => productCategory.ensureIndexes());

  beforeEach(() => {
    resource = {
      code: 'code',
      description: 'Description',
      name: 'Category X',
    };
  });

  function act(body: object = resource) {
    return request(app)
      .post(`/api/v1/${RESOURCE_URI}`)
      .send(body);
  }

  it('it returns status 201', () => {
    return act().expect(201);
  });

  it('it sets content-type to application/json', () => {
    return act().expect('Content-Type', /application\/json/);
  });

  it('it returns the category as resource', () => {
    return act()
      .then((res) => {
        return productCategory
          .findOne()
          .exec()
          .then((storedCategory) => {
            const mappedCategory = JSON.parse(JSON.stringify(productCategoryMapper.map(storedCategory)));
            return expect(res).to.have.a.property('body').that.eql(mappedCategory);
          });
      });
  });

  describe('persistance', () => {

    it('it stores the code as uppercase', () => {
      return act()
        .then((res) => productCategory.findById(res.body.id).exec())
        .then((category) => {
          return expect(category)
            .to.have.a.property('code')
            .that.eq(resource.code.toUpperCase());
        });
    });

    it('it stores the name', () => {
      return act()
        .then((res) => productCategory.findById(res.body.id).exec())
        .then((category) => {
          return expect(category)
            .to.have.a.property('name')
            .that.eq(resource.name);
        });
    });

    it('it stores the description', () => {
      return act()
        .then((res) => productCategory.findById(res.body.id).exec())
        .then((category) => {
          return expect(category)
            .to.have.a.property('description')
            .that.eq(resource.description);
        });
    });

  });

  describe('HTTP 1.1 409 Conflict', () => {
    function conflict(code: string) {
      return {
        error: 'Conflict',
        message: `The 'ProductCategory' already exists (code:'${code}')`,
        statusCode: 409,
      };
    }

    beforeEach(() => {
      const mobilePhones = productCategoryMother.mobilePhones();
      resource.code = mobilePhones.code;

      return mobilePhones.save();
    });

    it('it return the status if the category already exists', () => {
      return act().expect(409, conflict(resource.code));
    });

  });

  describe('HTTP 1.1 400 Bad Request', () => {
    it('it return the status if code is not provided', () => {
      delete resource.code;
      return act()
        .expect(400)
        .expect((res) => {
          return expect(res.body)
            .to.have.a.deep.property('data')
            .contain.a.thing.with.property('message', '"code" is required');
        });
    });

    it('it return the status if code is too long', () => {
      resource.code = '012345678901234567890';
      return act()
        .expect(400)
        .expect((res) => {
          return expect(res.body)
            .to.have.a.deep.property('data')
            .contain.a.thing.with.property('message', '"code" length must be less than or equal to 20 characters long');
        });
    });

    it('it return the status if name is not provided', () => {
      delete resource.name;
      return act()
        .expect(400)
        .expect((res) => {
          return expect(res.body)
            .to.have.a.deep.property('data')
            .contain.a.thing.with.property('message', '"name" is required');
        });
    });
  });

  after(() => dbHelper.disconnect());
});

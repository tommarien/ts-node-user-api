import { expect } from 'chai';
import * as request from 'supertest';
import app from '../../../src/app';
import productCategoryMapper from '../../../src/mappers/product-category-mapper';
import productCategory from '../../../src/models/product-category';
import dbHelper from '../../db-helper';

const RESOURCE_URI = 'product-categories';

describe(`POST /api/${RESOURCE_URI}`, () => {
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
      .post(`/api/${RESOURCE_URI}`)
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

  after(() => dbHelper.disconnect());
});

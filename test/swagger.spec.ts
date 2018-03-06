import { expect } from 'chai';
import * as YamlJs from 'yamljs';

describe('Swagger yml', () => {
  it('it can parse the yml file', () => {
    return expect(() => YamlJs.load('swagger.yml')).to.not.throw();
  });
});

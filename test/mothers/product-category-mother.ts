import productCategory from '../../src/models/product-category';

export function mobilePhones() {
  const category = new productCategory();
  category.code = 'MOBPHO';
  category.name = 'Mobile Phones';
  category.description = 'Everything concerning mobile phones';
  return category;
}

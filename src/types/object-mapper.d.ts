/** Declaration file generated by dts-gen */

export = object_mapper;

declare function object_mapper(fromObject: any, toObject: any, propertyMap: any): any;
declare function object_mapper(fromObject: any, propertyMap: any): any;

declare namespace object_mapper {
  function getKeyValue(fromObject: any, fromKey: any): any;

  function setKeyValue(baseObject: any, destinationKey: any, fromValue: any): any;

  namespace getKeyValue {
    const prototype: {
    };

  }

  namespace setKeyValue {
    const prototype: {
    };

  }
}
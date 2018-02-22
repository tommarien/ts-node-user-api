import * as objectMapper from 'object-mapper';

export interface IMapper {
  map(source: object): object;
  mapMany(sources: object[]): object[];
}

export class ObjectMapper implements IMapper {
  private readonly propertyMap: object;

  constructor(propertyMap: object) {
    this.propertyMap = propertyMap;
  }

  public map(source: object): object {
    return objectMapper(source || {}, this.propertyMap);
  }

  public mapMany(sources: object[]): object[] {
    return sources.map(source => this.map(source));
  }
}

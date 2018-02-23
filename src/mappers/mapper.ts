import * as objectMapper from 'object-mapper';

export interface IMapper {
  map(source: any): any;
  mapMany(sources: any[]): any[];
}

export class ObjectMapper implements IMapper {
  private readonly propertyMap: any;

  constructor(propertyMap: any) {
    this.propertyMap = propertyMap;
  }

  public map(source: any): object {
    return objectMapper(source || {}, this.propertyMap);
  }

  public mapMany(sources: any[]): any[] {
    return sources.map((source) => this.map(source));
  }
}

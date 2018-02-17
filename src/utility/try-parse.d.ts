declare namespace try_parse {
  interface Static {
    tryParseInt(value: any, defaultValue?: number): number;
  }
}


declare var tryParse: try_parse.Static;
export = tryParse;

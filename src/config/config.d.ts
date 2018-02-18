declare namespace Configuration {
  interface MongoConfiguration {
    uri: string;
    poolSize: number;
  }

  interface RuntimeConfiguration {
    env: string;
    port: string;
  }

  interface static {
    mongo: MongoConfiguration;
    runtime: RuntimeConfiguration;
  }
}

declare var config: Configuration.static;
export = config;

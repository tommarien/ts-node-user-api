declare namespace Configuration {
  interface MongoConfiguration {
    uri: string;
    poolSize: number;
  }

  interface RuntimeConfiguration {
    env: string;
    port: string;
    exitDelay: number;
  }

  interface static {
    mongo: MongoConfiguration;
    runtime: RuntimeConfiguration;
  }
}

declare var config: Configuration.static;
export = config;

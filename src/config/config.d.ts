declare const config: {
  mongo: {
    uri: string;
    poolSize: number;
  };
  runtime: {
    env: string;
    port: string;
    exitDelay: number;
  };
};

export = config;

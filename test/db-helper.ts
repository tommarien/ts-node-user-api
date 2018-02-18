import * as mongoose from 'mongoose';

import { mongo } from '../src/config/config';

class DbHelper {
  public static connect() {
    return mongoose.connect(`${mongo.uri}-test`);
  }

  public static disconnect() {
    return mongoose.disconnect();
  }

  public static dropCollection(model: mongoose.Model<any>) {
    return model.remove({});
  }

  // tslint:disable-next-line:array-type
  public static dropCollections(...models: mongoose.Model<any>[]) {
    return Promise.all(models.map(model => this.dropCollection(model)));
  }
}

export default DbHelper;

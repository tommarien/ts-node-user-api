import * as mongoose from 'mongoose';

import { mongo } from '../src/config/config';

class DbHelper {
  static connect() {
    return mongoose.connect(`${mongo.uri}-test`);
  }

  static disconnect() {
    return mongoose.disconnect();
  }

  static dropCollection(model: mongoose.Model<any>) {
    return model.remove({});
  }

  static dropCollections(...models: mongoose.Model<any>[]) {
    return Promise.all(models.map(model => this.dropCollection(model)));
  }
}

export default DbHelper;

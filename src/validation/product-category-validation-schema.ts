import * as Joi from 'joi';
import { join } from 'path';

export default {
  code: Joi.string().max(20).required(),
  description: Joi.string().max(256).optional(),
  name: Joi.string().max(80).required(),
};

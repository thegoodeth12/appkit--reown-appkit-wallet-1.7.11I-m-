import Base from '@/models/base.js';

class Datastore extends Base {
  static tableName = 'datastore';

  static jsonSchema = {
    type: 'object',
    required: ['key', 'value', 'scopeId'],

    properties: {
      id: { type: 'string', format: 'uuid' },
      key: { type: 'string', minLength: 1 },
      value: { type: 'string' },
      scope: {
        type: 'string',
        enum: ['flow'],
        default: 'flow',
      },
      scopeId: { type: 'string', format: 'uuid' },
    },
  };
}

export default Datastore;

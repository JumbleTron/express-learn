export const postSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
  },
  required: ['name', 'location'],
  additionalProperties: false,
};

import { DEFAULT_PER_PAGE } from '../middlewares/queryParamsParser.js';

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

export const listSchema = {
  type: 'object',
  properties: {
    page: {
      type: 'number',
      minimum: 1,
    },
    per_page: {
      type: 'number',
      default: DEFAULT_PER_PAGE,
      maximum: DEFAULT_PER_PAGE,
    },
    order: {
      type: 'object',
      properties: {
        key: { type: 'string', enum: ['asc', 'desc'] },
        name: { type: 'string', enum: ['asc', 'desc'] },
      },
      additionalProperties: false,
    },
    user_id: { type: 'number', minimum: 1 },
    search: {
      type: ['string', 'null'],
    },
  },
  additionalProperties: false,
};

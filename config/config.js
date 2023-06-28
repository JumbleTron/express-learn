import Ajv from 'ajv';

const envVarsSchema = {
  type: 'object',
  properties: {
    NODE_ENV: {
      type: 'string',
      enum: ['production', 'development', 'test', 'local'],
    },
    MONGO_URI: {
      type: ['string'],
    },
    ALLOWED_DOMAIN: {
      type: ['string', 'null'],
    },
    PORT: {
      type: ['string', 'null'],
    },
  },
  additionalProperties: true,
};

const validate = new Ajv().compile(envVarsSchema);

if (!validate(process.env)) {
  throw new Error(
    `Config validation error: ${JSON.stringify(validate.errors)}`
  );
}

export const envs = {
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || 3000),
  mongo: {
    url: process.env.MONGO_URI,
  },
  security: {
    cors: process.env.ALLOWED_DOMAIN || '*',
  },
};

export const isDevelopment = () => {
  return envs.env === 'local' || envs.env === 'development';
};

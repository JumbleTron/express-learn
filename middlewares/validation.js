import Ajv from 'ajv';

export const validate = (schema) => (req, res, next) => {
  const validate = new Ajv({ coerceTypes: true, allErrors: true }).compile(
    schema
  );
  if (validate(req.body)) {
    return next();
  }

  res.status(422);
  const messages = validate.errors.map((details) => {
    return {
      [details.instancePath.replace('/', '')]: details.message,
    };
  });
  res.json({ errors: messages });
};

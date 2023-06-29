import Ajv from 'ajv';
export const DEFAULT_PER_PAGE = 30;

export const queryParamsParser = (schema) => (req, res, next) => {
  const params = {
    ...req.query,
    page: parseInt(req.query.page || 1),
    per_page: parseInt(req.query.per_page || DEFAULT_PER_PAGE),
    order: req.query.order,
    search: req.query.search || null,
  };

  const validate = new Ajv({ coerceTypes: true, allErrors: true }).compile(
    schema
  );

  if (validate(params)) {
    req.params = params;
    req.offset = (params.page - 1) * params.per_page;

    return next();
  }

  res.status(400);
  const messages = validate.errors.map((details) => {
    return {
      [details.instancePath.replace('/', '')]: details.message,
    };
  });
  res.json({ errors: messages });
};

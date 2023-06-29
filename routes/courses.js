import express from 'express';
import { ROLE_ADMIN, ROLE_USER } from '../config/role.js';
import { authorization } from '../middlewares/authorization.js';
import { queryParamsParser } from '../middlewares/queryParamsParser.js';
import { validate } from '../middlewares/validation.js';
import { listSchema, postSchema } from '../schemas/courses.js';

const courseRouter = express.Router();
courseRouter
  .get('/', queryParamsParser(listSchema), function (req, res) {
    res.json({
      per_page: 30,
      page: 1,
      total_items: 1,
      data: [{ id: 1, name: 'IPAF', location: 'Liverpool' }],
    });
  })
  .post('/', authorization(ROLE_ADMIN), validate(postSchema), (req, res) => {
    res.status(201);
    res.json({ id: 2, name: 'CIBW', location: 'Liverpool' });
  })
  .get('/:id', function (req, res) {
    if (parseInt(req.params.id) === 1) {
      res.json({ id: 1, name: 'IPAF', location: 'Liverpool' });
    }

    res.status(404);
    res.json({ error: 'Not found' });
  })
  .put('/:id', authorization(ROLE_USER), (req, res) => {
    res.status(201);
    res.json({
      id: parseInt(req.params.id),
      name: 'CIBW',
      location: 'Liverpool',
    });
  });

export default courseRouter;

import express from 'express';
import { ROLE_ADMIN, ROLE_USER } from '../config/role.js';
import { authorization } from '../middlewares/authorization.js';

const courseRouter = express.Router();
courseRouter
  .get('/', function (req, res) {
    res.json({
      per_page: 30,
      page: 1,
      total_items: 1,
      data: [{ id: 1, name: 'IPAF', location: 'Liverpool' }],
    });
  })
  .post('/', authorization(ROLE_ADMIN), (req, res) => {
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

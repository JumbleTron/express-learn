import express from 'express';

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
  .get('/:id', function (req, res) {
    if (parseInt(req.params.id) === 1) {
      res.json({ id: 1, name: 'IPAF', location: 'Liverpool' });
    }

    res.status(404);
    req.json({ error: 'Not found' });
  });

export default courseRouter;

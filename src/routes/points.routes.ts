import { Router } from 'express';
import PointsRepository from '../repository/PointsRepository';
import PointsController from '../controllers/PointsController';

const pointsRouter = Router();
const pointsRepository = new PointsRepository();

pointsRouter.use(function (req, res, next) {
  console.log(new Date().toISOString(), req.originalUrl);
  next();
});

pointsRouter.get('/', (request, response) =>{
  pointsRepository.all()
    .then( points => {
      return response.json(points);
    })
    .catch( error => {
      return response.status(400).json(error.message);
    })
})

pointsRouter.get('/load', (request, response) =>{
  const pointsController = new PointsController(pointsRepository);
  pointsController.loadPoints()
    .then( result => {
      return response.json(result);
    })
    .catch( error => {
      return response.status(400).json(error.message);
    })
})

pointsRouter.get('/getRecordsOfPoint/:id', (request, response) =>{
  const { id } = request.params;
  
  const pointsController = new PointsController(pointsRepository);
  pointsController.getRecordsOfPoint(id)
    .then( result => {
      return response.json(result);
    })
    .catch( error => {
      return response.status(400).json(error.message);
    })
})

export default pointsRouter;

import { Router } from 'express';
import RecordsRepository from '../repository/RecordsRepository';
import RecordsController from '../controllers/RecordsController';

const recordsRouter = Router();
const recordsRepository = new RecordsRepository();

recordsRouter.use(function (req, res, next) {
  console.log(new Date().toISOString(), req.originalUrl);
  next();
});

recordsRouter.get('/', (request, response) =>{
  recordsRepository.all()
    .then( records => {
      return response.json(records);
    })
    .catch( error => {
      return response.status(400).json(error.message);
    })
})

recordsRouter.get('/load', (request, response) =>{
  const recordsController = new RecordsController(recordsRepository);
  recordsController.loadPoints()
    .then(result => {
      return response.json(result);
    })
    .catch( error => {
      return response.status(400).json(error.message);
    })
})

export default recordsRouter;
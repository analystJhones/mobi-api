import { Router } from 'express';
import pointsRouter from './points.routes';
import recordsRouter from './records.routes';

const routes = Router();

routes.use('/points', pointsRouter);
routes.use('/records', recordsRouter);

export default routes;

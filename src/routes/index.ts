import { Router } from 'express';
import pointsRouter from './points.routes';
import recordsRouter from './records.routes';
import cors from 'cors';

const routes = Router();

routes.use(cors());
routes.use('/points', pointsRouter);
routes.use('/records', recordsRouter);

routes.get('/', (request, response) => {
    response.send("WELCOME MOBI-API");
});

export default routes;

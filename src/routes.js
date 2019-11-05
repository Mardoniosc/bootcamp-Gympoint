import { Router } from 'express';

import UserController from './app/controller/UserController';
import StudentController from './app/controller/StudentController';
import SessionController from './app/controller/SessionController';
import PlanController from './app/controller/PlanController';
import MatriculaController from './app/controller/MatriculaController';
import CheckinController from './app/controller/CheckinController';

import authMeddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.use(authMeddleware);

routes.put('/users', UserController.update);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:id', PlanController.delete);
routes.put('/plans/:id', PlanController.update);

routes.post('/matriculas/:id', MatriculaController.store);
routes.get('/matriculas/', MatriculaController.index);
routes.put('/matriculas/:id', MatriculaController.update);
routes.delete('/matriculas/:id', MatriculaController.delete);

export default routes;

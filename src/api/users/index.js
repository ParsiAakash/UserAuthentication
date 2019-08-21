import { Router } from 'express';
const controller = require('./users.controller');

const router = new Router();

router.post('/createUser', controller.createUser);
router.post('/verifyUser', controller.verifyUser);
router.get('/userDetails/:id', controller.userDetails);


export default router;

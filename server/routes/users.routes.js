import { Router } from 'express';
import * as UsersController from '../controllers/users.controller';

const router = new Router();

//login
router.route("/login").post(UsersController.login);

router.route('/register').post(UsersController.register);

router.route('/connect').post(UsersController.connect);

router.route('/accounts').get(UsersController.getAccounts);

export default router;

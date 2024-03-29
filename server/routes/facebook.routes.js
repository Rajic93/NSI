import { Router } from 'express';
import * as FacebookController from '../controllers/facebook.controller';

const router = new Router();

// Login to fb
router.route("/login").post(FacebookController.login);
router.route("/token").post(FacebookController.accessToken);
export default router;

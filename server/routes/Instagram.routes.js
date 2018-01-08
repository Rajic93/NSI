import { Router } from 'express';
import * as InstagramController from '../controllers/Instagram.controller';

const router = new Router();

// Login to Instagram
router.route("/login").get(InstagramController.login);

// Login redirect
router.route("/inst_redirect").get(InstagramController.redirect);

export default router;

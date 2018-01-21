import { Router } from 'express';
import * as InstagramController from '../controllers/Instagram.controller';

const router = new Router();

// Login to Instagram
router.route("/login").get(InstagramController.login);

// Login redirect
router.route("/inst_redirect").get(InstagramController.redirect);

router.route("/feed").get(InstagramController.getFeed);

router.route('/like').post(InstagramController.like);

router.route('/dislike').post(InstagramController.dislike);

export default router;

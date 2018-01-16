import Facebook from '../models/facebook';
import * as FacebookModel from '../models/facebook';
import * as UsersController from './users.controller';


export function login(req, res) {
  let userShortLivedToken = req.query.userShortLivedToken;

  FacebookModel.getUserLongLivedToken(userShortLivedToken, (data) => {
    res.status(200).send(data);
  });
}
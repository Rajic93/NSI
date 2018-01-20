import Facebook from '../models/facebook';
import * as FacebookModel from '../models/facebook';
import * as UsersController from './users.controller';


export function login(req, res) {
  let userShortLivedToken = req.body.userShortLivedToken;

  FacebookModel.generateUserLongLivedToken(userShortLivedToken, (data) => {
   // console.log("Short token" + userShortLivedToken);
   // console.log(data);
    res.status(200).send(data);
  });
}
import Facebook from '../models/facebook';
import * as FacebookModel from '../models/facebook';
import * as UsersController from './users.controller';


export function login(req, res) {
  let userShortLivedToken = req.body.userShortLivedToken;

  FacebookModel.generateUserLongLivedToken(userShortLivedToken, (data) => {
    console.log("Short token" + userShortLivedToken);
    console.log(data);

    let id = req.cookies.id;
    let longLivedToken = data.access_token;

    UsersController.connect(id, { token: longLivedToken }, "facebook", (status) => {
      switch (status) {
        case 500:
          res.status(500).send(err);
          res.end();
          break;
        case 404:
          res.status(404).send('invalid credentials');
          res.end();
          break;
        default:
          res.status(200).send(data);
          break;
      }
    });
  });
}

export function accessToken(req, res) {
  let id = req.cookies.id;

  UsersController.getFaceCode(id, (error, access_token) => {
    if (error) {
      res.send(error);
      res.end();
      return;
    }

    if (access_token === undefined) {
      res.status(404).send('No user with specified id.');
      res.end();
      return;
    }

    res.status(200).send(access_token);
    res.end();
  });
}
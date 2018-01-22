import model from "../models/users";

import bcrypt from 'bcrypt';

const saltRounds = 15;

export function login(req, res) {

  let email = req.body.email;
  let password = req.body.password;
  model.findOne({
    'signingEmail': email
  }, (err, data) => {

    console.log('0');
    if (err) {
      res.status(400).end();
      return;
    }
    console.log('1');
    if (data == null) {
      res.status(300).send("data does not exist.");
      res.end();
      return;
    }
    console.log('2');

    bcrypt.compare(password, data.signingHashedPassword, (err, result) => {

      if (!result) {
        res.status(400).end();
        return;
      }
      console.log('3');

      let response = {
        id: data._id,
        accounts: []
      };

      data.connectedAccounts.forEach(account => {
        response.accounts.push(account.type);
      });

      res.status(200).send(response);
      res.end();
    });
  });
}

export function register(req, res) {

  let email = req.body.email;
  let password = req.body.password;
  let salt;

  model.findOne((err, data) => {

    if (err) {
      res.status(404).end();
      return;
    }

    //already exists
    if (data) {
      res.status(400).send('already exists');
      res.end();
      return;
    }

    bcrypt.genSalt(saltRounds, function (err, salt) {

      if (err) {
        res.status(400).send(err);
        res.end();
        return;
      }

      bcrypt.hash(password, salt, function (err, hash) {

        salt = salt;

        if (err) {
          res.status(400).send(err);
          res.end();
          return;
        }

        let newUser = new model({
          signingEmail: email,
          signingHashedPassword: hash,
          salt: salt
        });

        newUser.save();
        res.status(200).send('success');
        res.end();
      });
    });
  }).where("signingEmail", email);
};

export function connect(id, account, accType, cb) {

  model.findOne({
    _id: id
  }, (err, response) => {

    if (err) {
      cb(500);
      return;
    }

    if (response == undefined) {
      cb(404);
      return;
    }

    let item = {
      type: accType,
      account: account
    };

    response.connectedAccounts.push(item);
    response.save();

    cb(200);
  });
}

export function getAccounts(req, res) {

  let id = req.cookies.id;

  model.findOne({
    _id: id
  }, (err, response) => {

    if (err) {
      res.status(500).end();
      return;
    }

    if (response == undefined) {
      res.status(404).end();
      return;
    }

    res.status(200).send(response.connectedAccounts);
    res.end();
  });
}

export function getInstaCode(id, callback) {

  model.findOne({
    _id: id
  }, (error, data) => {

    if (error) {
      callback(true, false);
      return;
    }

    if (!data) {
      callback(false, false);
      return;
    }

    let access_token = data.connectedAccounts.find((account) => {

      return account[0].type === 'instagram';
    })[0].account.access_token;

    callback(undefined, access_token);
  })
}

export function getFaceCode(id, callback) {

  model.findOne({
    _id: id
  }, (error, data) => {

    if (error) {
      callback(true, false);
      return;
    }

    if (!data) {
      callback(false, false);
      return;
    }

    let fbAccount = data.connectedAccounts.find((account) => {

      return account[0].type === 'facebook';
    });

    let token;
    if (fbAccount && fbAccount.length > 0) {
      token = fbAccount[0].account.token;
    } else {
      callback(false, "");
      return;
    }

    callback(undefined, token);
  })
}
import model from "../models/users";

import bcrypt from 'bcrypt';

const saltRounds = 15;

export function login(req, res) {

  let email = req.body.email;
  let password = req.body.password;
  model.findOne({
    'signingEmail': email
  },(err, data) => {

    if (err){
      res.status(400).end();
      return;
    }

    if (data == null) {
      res.status(300).send("data does not exist.");
      res.end();
      return;
    }

    bcrypt.compare(password, data.signingHashedPassword, (err, result) => {

      if (!result) {
        res.status(400).end();
        return;
      }

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

    if (err){
      res.status(404).end();
      return;
    }

    //already exists
    if (data){
      res.status(400).send('already exists');
      res.end();
      return;
    }

    bcrypt.genSalt(saltRounds, function(err, salt) {
      
      if (err) {
        res.status(400).send(err);
        res.end();
        return;
      }

      bcrypt.hash(password, salt, function(err, hash) {

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

    if(response == undefined) {
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
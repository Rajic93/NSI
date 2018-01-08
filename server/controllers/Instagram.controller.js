import Instagram from '../models/Instagram';
import * as InstaModel from "../models/Instagram";
import * as UsersModel from './users.controller';



export function login(req, res) {
    InstaModel.redirect(res);
};

// Redirect to recieve code in order to get OAuth token
export function redirect(req, res) {

    //no errors
    let code = req.query.code;
    InstaModel.authenticate(code, (data) => {
        
        //hardcode id for now
        let id = "5a521813d0a6e9dcecf89907";
        UsersModel.connect(id, data, 'instagram', (status) => {
            
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
                    res.status(200);
                    res.redirect("http://localhost:10000");
                    break;
            }
        });
    });
};

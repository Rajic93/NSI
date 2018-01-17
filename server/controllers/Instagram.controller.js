import Instagram from '../models/Instagram';
import * as InstaModel from "../models/Instagram";
import * as UsersModel from './users.controller';


/**
 * The first step in two factor authentication.
 * @param {request object} req 
 * @param {response object} res 
 */
export function login(req, res) {
    InstaModel.redirect(res);
};

/**
 * The second step in two factor authentication.
 * Redirect to receive code in order to get OAuth token.
 * @param {request object} req 
 * @param {response object} res 
 */
export function redirect(req, res) {
    console.log('redirected');
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
                    res.redirect("http://localhost:10000/feed");
                    break;
            }
        });
    });
};


/**
 * Get all posted media of the connected user.
 * @param {request object} req 
 * @param {response object} res 
 */
export function getFeed(req, res) {

    let id = req.headers.cookie;
    console.log(id.split("=")[1]);
    // UsersModel.

    // InstaModel.feed(req.query.id, (data) => {
    //     res.send(data);
    //     res.end();
    // });
}
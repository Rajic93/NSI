import * as InstaModel from "../models/Instagram";
import * as UsersController from './users.controller';


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
        UsersController.connect(id, data, 'instagram', (status) => {
            
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

    let id = req.headers.cookie.split(';').find((element) => {
        let name = element.split('=')[0];
        if (name[0] === ' ')
            name = name.substring(1);
        return name === 'id';
    }).split('=')[1];

    UsersController.getInstaCode(id, (error, access_token) => {
    
        if (error) {
            res.send(error);
            res.end();
        }
        
        if (access_token === undefined) {
            res.status(404).send('No user with specified id.');
            res.end();
        }
        
        InstaModel.feed(access_token, (data) => {
            res.status(200).send(data);
            res.end();
        })
    })
}

export function like(req, res) {

    let mediaId = req.query.mediaId;
    let id = req.headers.cookie.split(';').find((element) => {
        let name = element.split('=')[0];
        if (name[0] === ' ')
            name = name.substring(1);
        return name === 'id';
    }).split('=')[1];
    
    UsersController.getInstaCode(id, (error, access_token) => {

        if (error) {
            res.send(error);
            res.end();
        }
        
        if (access_token === undefined) {
            res.status(404).send('No user with specified id.');
            res.end();
        }
        console.log(1);
        InstaModel.like(mediaId, access_token, (error, data) => {
            
            if (error) {
                res.status(404).send(error);
                res.end();
            }
            res.status(200).send(data);
            res.end();
        });
    })
}

export function dislike(req, res) {

    let mediaId = req.query.id;
    let id = req.headers.cookie.split(';').find((element) => {
        let name = element.split('=')[0];
        if (name[0] === ' ')
            name = name.substring(1);
        return name === 'id';
    }).split('=')[1];
    
    UsersController.getInstaCode(id, (access_token) => {

        if (error) {
            res.send(error);
            res.end();
        }
        
        if (access_token === undefined) {
            res.status(404).send('No user with specified id.');
            res.end();
        }
        
        InstaModel.dislike(mediaId, access_token, (status) => {
            res.send(status);
            res.end();
        });
    })
}
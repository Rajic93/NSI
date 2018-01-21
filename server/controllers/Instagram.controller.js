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
        
        let id = req.cookies.id;

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

    console.log(req.cookies);
    let id = req.cookies.id;


    UsersController.getInstaCode(id, (error, access_token) => {

        if (error) {
            res.send(error);
            res.end();
            return;
        }
        
        if (!access_token) {
            res.status(404).send('No user with specified id.');
            res.end();
            return;
        }
        
        InstaModel.feed(access_token, (error, data) => {

            if (error) {
                res.status(404).send(error);
                res.end();
                return;
            }
            let formatedData = Format(data);
            res.status(200).send(formatedData);
            res.end();
        })
    })
}

const Format = (response) => {
    let data = response.data;
    let formatedData = []
    data.forEach(object => {
        let formatedObject = {
            type: 'instagram',
            data: {
                id: object.id,
                avatar: object.user.profile_picture,
                img: object.images.standard_resolution.url,
                comments: object.comments.count,
                likes: object.likes.count
            }
        };
        formatedData.push(formatedObject);
    });
    return formatedData;
}

export function like(req, res) {

    let mediaId = req.body.mediaId;
    let id = req.cookies.id;
    
    UsersController.getInstaCode(id, (error, access_token) => {

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

        InstaModel.like(mediaId, access_token, (error, data) => {
            
            if (error) {
                res.status(404).send(error);
                res.end();
                return;
            }

            res.status(200).send(data);
            res.end();
        });
    })
}

export function dislike(req, res) {

    let mediaId = req.body.mediaId;
    let id = req.cookies.id;
    
    UsersController.getInstaCode(id, (error, access_token) => {

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
        
        InstaModel.dislike(mediaId, access_token, (error, data) => {
            
            if (error) {
                res.status(404).send(error);
                res.end();
                return;
            }

            res.status(200).send(data);
            res.end();
        });
    })
}
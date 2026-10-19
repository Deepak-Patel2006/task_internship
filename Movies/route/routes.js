import express from 'express';
import {
    logout,
    Addmovie,
    Deletemovie,
    Updatemovie,
    Searchmovie,
    Load,
    Toprated,
    Watchedmovie,
    Stats
} from '../control/controlers.js'
import { checkSession } from '../middleware/checksession.js';
import { checkrole } from '../middleware/checkroles.js';
import { permissions } from '../constant/permission.js';

const route = express.Router();

route.post('/',checkSession,checkrole(permissions.Addmovie),Addmovie);
route.get('/load',Load);
route.get('/rate',Toprated);
route.get('/watched',Watchedmovie);
route.get('/stats',Stats);
route.get('/search',Searchmovie);
route.post('/logout',logout);
route.delete('/:Id',checkSession,checkrole(permissions.MOVIE_DELETE),Deletemovie);
route.patch('/:Title',checkSession,checkrole(permissions.MOVIE_UPDATE),Updatemovie);

export default route;


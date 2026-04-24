import {StatusCodes} from "http-status-codes";
import {getProfile} from "../../../services/profile.service.js";
import {getUser} from "../../../services/user.service.js";


export async function GetUserABL(req, res) {
    try{
        const uid = req.user.uid;

        const profile = await getProfile(uid);

        if(!profile){
            return res.status(StatusCodes.NOT_FOUND).send({
               error: 'USER_NOT_FOUND',
               message: 'User not found'
            });
        }

        const user = await getUser(uid);

        if(!user){
            return res.status(StatusCodes.NOT_FOUND).send({
                error: 'USER_NOT_FOUND',
                message: 'User not found'
            });
        }

        const result = {
            ...profile,
            ...user
        }

        return  res.status(StatusCodes.OK).json(result);

    }catch(err){
        console.error(`${req.originalUrl || req.url} - GetUserABL error:`, err);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
import { StatusCodes } from "http-status-codes";
import {createProfile, getProfile} from "../../../services/profile.service.js";
import {UserRole} from "../../../types/user_role.js";


export async function CreateUserABL(req, res) {
    try {

        const {role} = req.body;

        /// Check role parameter
        if(!role){
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "MISSING_ROLE_PARAMETER",
                message: "Missing role parameter"
            });
        }


        /// Check role value
        if(!Object.values(UserRole).includes(role)){
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "INVALID_ROLE",
                message: "Invaild role"
            });
        }


        /// Disable admin role
        if(role === UserRole.ADMIN){
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "FORBIDDEN_ROLE",
                message: "Admin cant be created"
            });
        }


        const uid = req.user.uid;

        /// Check if profile exists
        const profile = await getProfile(uid);
        if(profile){
            console.log(`${req.originalUrl}      CreateUserABL      User profile already exists     [ uid = ${uid}]`);
            return res.sendStatus(StatusCodes.CONFLICT);
        }


        /// Save new User profile

        const dto =  {
            uid: uid,
            role: role
        };

        const newProfile = await  createProfile();


        if(!newProfile){
            throw new Error('Profile creation failed');
        }

        return  res.status(StatusCodes.CREATED).json(newProfile);

    } catch (err) {
        console.error(`${req.originalUrl || req.url} - CreateUserABL error:`, err);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
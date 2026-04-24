import { firebaseAuth } from "../config/firebase.js";
import { StatusCodes } from "http-status-codes";

export async function getUser(uid){
    try{
        const user = await firebaseAuth().getUser(uid);
        if(!user){
            throw new Error('User not found');
        }
        return  user;
    }catch(err){
        console.error(`UserService      getUser     ${err}`);
        return null;
    }
}
import express from "express";
import { StatusCodes } from "http-status-codes";
import {CreateUserABL} from "./ABL/create_user.js";
import {GetUserABL} from "./ABL/get_user.js";

import {LocalLogin} from "./login/auth_local.js"
import {GoogleLogin} from "./login/auth_google.js"

const router = express.Router();

router.post('/localLogin', 
            async (req, res) => {
    return await LocalLogin(req, res);
});

router.post('/googleLogin', 
            async (req, res) => {
    return await GoogleLogin(req, res);
});

export default router;
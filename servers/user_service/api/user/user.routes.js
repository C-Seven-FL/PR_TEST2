import express from "express";
import { StatusCodes } from "http-status-codes";
import {CreateUserABL} from "./ABL/createUserABL.js";
import {GetUserABL} from "./ABL/getUserABL.js";

import {authTokenCheck} from "../../middleware/authToken.js"

const router = express.Router();

router.post('/',
            authTokenCheck,
            async (req, res) => {
    return await CreateUserABL(req, res);
});

router.get('/', 
            authTokenCheck,
            async (req, res) => {
    return await GetUserABL(req, res);
});

export default router;
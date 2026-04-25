import express from "express";
import { StatusCodes } from "http-status-codes";

import {CreateUserABL} from "./ABL/create_user_abl.js";
import {ListUserABL} from "./ABL/list_user_abl.js";
import {GetUserABL} from "./ABL/get_user_abl.js";
import {UpdateUserABL} from "./ABL/update_user_abl.js";

import {validateCreateUser, validateListUser, validateGetUser, validateUpdateUser} from "../../services/validateUser.js"

import {authTokenCheck} from "../../middleware/authToken.js"

const router = express.Router();

router.post('/create', 
            
            validateCreateUser,
            async (req, res) => {
    return await CreateUserABL(req, res);
});

router.get('/', 

            validateListUser,
            async (req, res) => {
    return await ListUserABL(req, res);
});

router.get('/:id', 

            validateGetUser,
            async (req, res) => {
    return await GetUserABL(req, res);
});

router.put('/:id',

            validateUpdateUser,
            async (req, res) => {
    return await UpdateUserABL(req, res);
});

export default router;
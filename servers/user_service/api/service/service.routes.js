import express from "express";
import { StatusCodes } from "http-status-codes";

import {CreateServiceABL} from "./ABL/create_service_abl.js";
import {ListServiceABL} from "./ABL/list_service_abl.js";
import {GetServiceABL} from "./ABL/get_service_abl.js";
import {UpdateServiceABL} from "./ABL/update_service_abl.js";

import {validateCreateService, validateListService, validateGetService, validateUpdateService} from "../../services/validateService.js"
import {authTokenCheck} from "../../middleware/authToken.js"

const router = express.Router();

/*
authTokenCheck, 
authTokenCheck("Provider"),
roleCheck("Provider"),
*/

router.post('/create', 
            
            validateCreateService,
            async (req, res) => {
    return await CreateServiceABL(req, res);
});

router.get('/', 

            validateListService,
            async (req, res) => {
    return await ListServiceABL(req, res);
});

router.get('/:id', 

            validateGetService,
            async (req, res) => {
    return await GetServiceABL(req, res);
});

router.put('/:id',

            validateUpdateService,
            async (req, res) => {
    return await UpdateServiceABL(req, res);
});

export default router;
import express from "express";
import { StatusCodes } from "http-status-codes";

import {CreateCategoryABL} from "./ABL/create_category_abl.js";
import {ListCategoryABL} from "./ABL/list_category_abl.js";
import {GetCategoryABL} from "./ABL/get_category_abl.js";
import {UpdateCategoryABL} from "./ABL/update_category_abl.js";

import {validateCreateCategory, validateListCategory, validateGetCategory, validateUpdateCategory} from "../../services/validateCategory.js"
import {authTokenCheck} from "../../middleware/authToken.js"

const router = express.Router();

/*
authTokenCheck, 
authTokenCheck("Provider"),
roleCheck("Provider"),
*/

router.post('/create', 
            
            validateCreateCategory,
            async (req, res) => {
    return await CreateCategoryABL(req, res);
});

router.get('/', 

            validateListCategory,
            async (req, res) => {
    return await ListCategoryABL(req, res);
});

router.get('/:id', 

            validateGetCategory,
            async (req, res) => {
    return await GetCategoryABL(req, res);
});

router.put('/:id',

            validateUpdateCategory,
            async (req, res) => {
    return await UpdateCategoryABL(req, res);
});

export default router;
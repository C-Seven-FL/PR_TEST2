import { createCategorySchema } from "../api/category/validation/create_category_valid.js";
import { listCategorySchema } from "../api/category/validation/list_category_valid.js";
import { getCategorySchema } from "../api/category/validation/get_category_valid.js";
import { updateCategorySchema } from "../api/category/validation/update_category_valid.js";

import { StatusCodes } from "http-status-codes";

export function validateCreateCategory(req, res, next) {
  try {
    const parsed = createCategorySchema.parse(req.body);

    req.body = parsed; 
    next();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid data',
          });
  }
}

export function validateListCategory(req, res, next) {
  try {
    const parsed = listCategorySchema.parse(req.query);

    req.validatedQuery = parsed; 
    next();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid data',
          });
  }
}

export function validateGetCategory(req, res, next) {
  try {
    const parsed = getCategorySchema.parse(req.params);

    req.validatedParams = parsed; 
    next();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid data',
          });
  }
}

export function validateUpdateCategory(req, res, next) {
  try {

    const parsedParam = getCategorySchema.parse(req.params);
    const parsedBody = updateCategorySchema.parse(req.body);

    req.validatedParams = parsedParam;
    req.body = parsedBody; 
    next();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid data',
          });
  }
}
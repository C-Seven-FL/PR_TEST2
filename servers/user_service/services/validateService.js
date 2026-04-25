import { createServiceSchema } from "../api/service/validation/create_service_valid.js";
import { listServiceSchema } from "../api/service/validation/list_service_valid.js";
import { getServiceSchema } from "../api/service/validation/get_service_valid.js";
import { updateServiceSchema } from "../api/service/validation/update_service_valid.js";

import { StatusCodes } from "http-status-codes";

export function validateCreateService(req, res, next) {
  try {
    const parsed = createServiceSchema.parse(req.body);

    req.body = parsed; 
    next();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid data',
          });
  }
}

export function validateListService(req, res, next) {
  try {
    const parsed = listServiceSchema.parse(req.query);

    req.validatedQuery = parsed; 
    next();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid data',
          });
  }
}

export function validateGetService(req, res, next) {
  try {
    const parsed = getServiceSchema.parse(req.params);

    req.validatedParams = parsed; 
    next();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid data',
          });
  }
}

export function validateUpdateService(req, res, next) {
  try {
    console.log(req.params)
    const parsedParam = getServiceSchema.parse(req.params);
    const parsedBody = updateServiceSchema.parse(req.body);

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
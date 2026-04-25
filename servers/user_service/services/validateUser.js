import { createClientSchema } from "../api/user/validation/create_userClient_valid.js";
import { createProviderSchema } from "../api/user/validation/create_userProvider_valid.js";
import { listUserSchema } from "../api/user/validation/list_user_valid.js";
import { getUserSchema } from "../api/user/validation/get_user_valid.js";
import { updateUserSchema } from "../api/user/validation/update_user_valid.js";

import { StatusCodes } from "http-status-codes";

export function validateCreateUser(req, res, next) {
  try {
    let parsed;
    
    if (req.body.user_type === "client") {parsed = createClientSchema.parse(req.body);}
    else {parsed = createProviderSchema.parse(req.body);}
    
    
    req.body = parsed; 

    next();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid data',
          });
  }
}

export function validateListUser(req, res, next) {
  try {
    const parsed = listUserSchema.parse(req.query);

    req.validatedQuery = parsed; 
    next();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid data',
          });
  }
}

export function validateGetUser(req, res, next) {
  try {
    const parsed = getUserSchema.parse(req.params);

    req.validatedParams = parsed; 
    next();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid data',
          });
  }
}

export function validateUpdateUser(req, res, next) {
  try {
    
    const parsedParam = getUserSchema.parse(req.params);
    const parsedBody = updateUserSchema.parse(req.body);
    

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
import { StatusCodes } from "http-status-codes";
import { findCategoryByID } from "../category.dao.js";

export async function GetCategoryABL(req, res) {
    try {

        const {id} = req.validatedParams;

        const result = await findCategoryByID(id);
        if (!result) {
            return res.status(StatusCodes.CONFLICT).json({
                message: "User not exist"
            });
        }

        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
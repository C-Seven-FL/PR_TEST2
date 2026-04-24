import { StatusCodes } from "http-status-codes";
import { findServiceByID } from "../service.dao.js";

export async function GetServiceABL(req, res) {
    try {

        const {id} = req.validatedParams;

        const result = await findServiceByID(id);
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
import { StatusCodes } from "http-status-codes";
import { getAllUsers } from "../user.dao.js";

export async function ListUserABL(req, res) {
    try {

        const filters = req.query;

        //console.log(filters)

        const result = await getAllUsers(filters);

        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
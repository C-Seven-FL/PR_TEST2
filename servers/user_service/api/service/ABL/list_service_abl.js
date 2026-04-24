import { StatusCodes } from "http-status-codes";
import { getAllServices } from "../service.dao.js";

export async function ListServiceABL(req, res) {
    try {

        const filters = req.query;

        console.log(filters)

        const result = await getAllServices(filters);

        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
import { StatusCodes } from "http-status-codes";
import { findServiceByID, updateService } from "../service.dao.js";

export async function UpdateServiceABL(req, res) {
    try {
        const {id} = req.validatedParams;
        const data = req.body;

        const existing = findServiceByID(id);
        if (!existing) {
            return res.status(StatusCodes.CONFLICT).json({
                message: "Service not exist"
            });
        }

        const updatedService = {
        ...existing,
        ...data
        };

        const result = await updateService(id, updatedService);
        console.log("RIBA")

        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
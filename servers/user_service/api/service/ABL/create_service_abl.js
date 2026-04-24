import { StatusCodes } from "http-status-codes";
import { createService, findServiceByName } from "../service.dao.js";
import crypto from "crypto";

export async function CreateServiceABL(req, res) {
    try {

        const data = req.body;

        const existing = findServiceByName(data.name);
        if (existing) {
            return res.status(StatusCodes.CONFLICT).json({
                message: "Service with this name already exists"
            });
        }

        const newService = {
        id: crypto.randomBytes(8).toString("hex"),
        ...data,
        banned_users: [],
        active: true,
        blocked: false
        };

        const result = await createService(newService);

        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
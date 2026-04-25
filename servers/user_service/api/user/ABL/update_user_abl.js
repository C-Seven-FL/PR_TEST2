import { StatusCodes } from "http-status-codes";
import { findUserByID, updateUser } from "../user.dao.js";

export async function UpdateUserABL(req, res) {
    try {
        const {id} = req.validatedParams;
        const data = req.body;

        const existing = findUserByID(id);
        if (!existing) {
            return res.status(StatusCodes.CONFLICT).json({
                message: "User not exist"
            });
        }

        const updatedUser = {
        ...existing,
        ...data
        };

        const result = await updateUser(id, updatedUser);
        //console.log("RIBA")

        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
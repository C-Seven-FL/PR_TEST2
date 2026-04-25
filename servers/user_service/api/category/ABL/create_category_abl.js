import { StatusCodes } from "http-status-codes";
import { createCategory, findCategoryByName } from "../category.dao.js";
import crypto from "crypto";

export async function CreateCategoryABL(req, res) {
    try {

        const data = req.body;

        const existing = await findCategoryByName(data.name);
        if (existing) {
            return res.status(StatusCodes.CONFLICT).json({
                message: "Category with this name already exists"
            });
        }

        const newCategory = {
        id: crypto.randomBytes(8).toString("hex"),
        ...data
        };

        const result = await createCategory(newCategory);

        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
import { StatusCodes } from "http-status-codes";
import { findCategoryByID, updateCategory } from "../category.dao.js";

export async function UpdateCategoryABL(req, res) {
    try {
        const {id} = req.validatedParams;
        const data = req.body;

        const existing = findCategoryByID(id);
        if (!existing) {
            return res.status(StatusCodes.CONFLICT).json({
                message: "Category not exist"
            });
        }

        const updatedCategory = {
        ...existing,
        ...data
        };

        const result = await updateCategory(id, updatedCategory);

        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
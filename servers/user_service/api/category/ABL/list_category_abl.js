import { StatusCodes } from "http-status-codes";
import { getAllCategories } from "../category.dao.js";

export async function ListCategoryABL(req, res) {
    try {

        const result = await getAllCategories();

        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
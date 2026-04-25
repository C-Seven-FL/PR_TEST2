import { StatusCodes } from "http-status-codes";
import { createUser, findUserByMail } from "../user.dao.js";
import { createService, findServiceByName } from "../../service/service.dao.js"
import crypto from "crypto";

export async function CreateUserABL(req, res) {
    try {
        
        const data = req.body;
        const user_new_id = crypto.randomBytes(8).toString("hex");

        const existing_user = findUserByMail(data.mail)
        if (existing_user) {
            return res.status(StatusCodes.CONFLICT).json({
                message: "User with this mail already exists"
            });
        }

        if (data.user_type === "provider") {
            const existing = findServiceByName(data.company_name);
            if (existing) {
                return res.status(StatusCodes.CONFLICT).json({
                    message: "Service with this name already exists"
                });
            }

            const user_data = {
                id: user_new_id,
                password: data.password,
                name: data.name,
                gender: data.gender,
                mail: data.mail,
                phone_number: data.phone_number,
                birthdate: data.birthdate,
                address: data.address,
                user_type: data.user_type,
                notifications: [],
                notification_turn: true,
                blocked: false
            }

            const service_data = {
                id: crypto.randomBytes(8).toString("hex"),
                userID: user_new_id,
                categoryID: data.categoryID,
                company_name: data.company_name,
                description: data.description,
                address: data.address, 
                working_days: data.working_days,
                hour_start: data.hour_start,
                hour_end: data.hour_end,
                slot_duration: data.slot_duration,
                banned_users: [],
                active: true,
                blocked: false
            };

            const result_service = await createService(service_data);
            const result_user = await createUser(user_data);
            
            return res.status(StatusCodes.CREATED).json(result_user);
        }

        const user_data = {
                id: user_new_id,
                ...data,
                notifications: [],
                notification_turn: true,
                blocked: false
            }

        const result = await createUser(user_data);

        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
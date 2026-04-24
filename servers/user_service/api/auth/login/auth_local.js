import {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";
//import {UserService} from "../../../service/user_service.js";

export async function LocalLogin(req, res){
    try{
        const { mail, password } = req.body;

        const mockUser = {
            id: "341f41f331f4",
            role: "Client",
            mail: "korkadot@gmail.com",
            password: "Qwer1234"
        }

        if (mail !== mockUser.mail || password !== mockUser.password) {
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET missing");
        }

        const token = jwt.sign(
            {
                userId: mockUser.id,
                role: mockUser.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        return res.status(StatusCodes.OK).json({token});

    } catch (err){
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
import { firebaseAuth } from "../config/firebase.js";
import { StatusCodes } from "http-status-codes";

export function authTokenCheck(requiredRole = null) {
    return async (req, res, next) => {
        try {
            const header = req.headers.authorization;

            if (!header) {
                return res
                    .status(StatusCodes.UNAUTHORIZED)
                    .json({ error: "Missing token" });
            }

            const token = header.split(" ")[1];

            const decoded = await firebaseAuth.verifyIdToken(token);


            const userType = "client"; //TODO role loading

            req.user = {
                uid: decoded.uid,
                email: decoded.email || "",
                user_type: userType
            };

            if (requiredRole && req.user.user_type !== requiredRole) {
                return res
                    .status(StatusCodes.FORBIDDEN)
                    .json({ error: "Insufficient permissions" });
            }

            next();
        } catch (err) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ error: "Invalid token" });
        }
    };
}
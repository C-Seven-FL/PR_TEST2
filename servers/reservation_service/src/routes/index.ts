import express from "express";
import reservationRoutes from "./reservation/reservation.routes";

const router = express.Router();

router.use('/reservation', reservationRoutes);

export default  router;
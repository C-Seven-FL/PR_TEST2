import express from "express";
import { randomUUID } from "crypto";
import {StatusCodes} from "http-status-codes";

const router = express.Router();

// In-memory storage
const reservations: Record<string, any> = {};

// CREATE
router.post("/", (req, res) => {
  const id = randomUUID();
  const reservation = {
    id,
    ...req.body,
  };

  reservations[id] = reservation;

  res.json(reservation);
});

// READ
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const reservation = reservations[id];

  if (!reservation) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Reservation not found" });
  }

  res.json(reservation);
});

// UPDATE
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const reservation = reservations[id];

  if (!reservation) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Reservation not found" });
  }

  if (updates.reservation_starts) {
    updates.edited = true;
  }

  const updatedReservation = {
    ...reservation,
    ...updates,
  };

  reservations[id] = updatedReservation;

  res.json(updatedReservation);
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const reservation = reservations[id];

  if (!reservation) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Reservation not found" });
  }

  delete reservations[id];

  res.json({ success: true, deleted: reservation });
});

export default router;
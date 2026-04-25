import express from "express";
import { randomBytes } from "crypto";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

// In-memory storage
const reservations = [];

const generateReservationId = () => randomBytes(8).toString("hex");

const toReservationDateTime = (value) => {
  const requiredFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

  if (requiredFormatRegex.test(value)) {
    return value;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  const hours = String(parsed.getHours()).padStart(2, "0");
  const minutes = String(parsed.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const normalizeReservation = (reservationId, dtoIn) => {
  return {
    id: reservationId,
    clientID: dtoIn.clientID,
    serviceID: dtoIn.serviceID,
    reservation_starts: toReservationDateTime(dtoIn.reservation_starts),
    reservation_ends: toReservationDateTime(dtoIn.reservation_ends),
    client_view: dtoIn.client_view ?? true,
    provider_view: dtoIn.provider_view ?? true,
    regular: dtoIn.regular ?? true,
    edited: false,
    status: dtoIn.status ?? "Active",
  };
};

const getReservationOr404 = (id, res) => {
  const reservation = reservations[id];

  if (!reservation) {
    res.status(StatusCodes.NOT_FOUND).json({ error: "Reservation not found" });
    return null;
  }

  return reservation;
};

// CREATE
router.post("/create", (req, res) => {

  const id = generateReservationId();
  const dtoIn = req.body;

  const newReservation = {...dtoIn, client_view: true, provider_view: true, regular: true, edited: false, status: "Active"}

  const reservation = normalizeReservation(id, newReservation);

  reservations.push(reservation)

  res.json(reservation);
});

// READ
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const reservation = reservations.find(s => s.id === id)
  if (!reservation) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: "Reservation not found"
    });
  }

  res.json(reservation);
});

// LIST
router.get("/", (req, res) => {
  const list_reservation = reservations
  res.json(list_reservation);
});

// UPDATE
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = reservations.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: "Reservation not found"
    });
  }

  const reservation = reservations[index];

  if (updates.reservation_starts) {
    updates.edited = true;
  }

  const updatedReservation = {
    ...reservation,
    ...updates,
    reservation_starts: updates.reservation_starts
      ? toReservationDateTime(updates.reservation_starts)
      : reservation.reservation_starts,
    reservation_ends: updates.reservation_ends
      ? toReservationDateTime(updates.reservation_ends)
      : reservation.reservation_ends,
  };

  reservations[index] = updatedReservation;

  res.json(updatedReservation);
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = reservations.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: "Reservation not found"
    });
  }

  const deleted = reservations[index];

  reservations.splice(index, 1);

  res.json({ success: true, deleted });
});

export default router;
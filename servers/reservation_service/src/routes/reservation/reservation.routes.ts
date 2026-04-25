import express from "express";
import { randomBytes } from "crypto";
import { StatusCodes } from "http-status-codes";
import { findServiceByID } from "../../../../user_service/api/service/service.dao"

const router = express.Router();

// In-memory storage
const reservations = [
  {
    id: "f31ef12f12f12ef",
    clientID: "mock-client-1",
    client_view: true,
    serviceID: "32rqty57o9809",
    provider_view: true,
    reservation_starts: "2026-04-27 11:00",
    reservation_ends: "2026-04-27 13:00",
    regular: true,
    edited: false,
    status: "Active"
  },
  {
    id: "fdq3fqfqfqbge",
    clientID: "mock-client-1",
    client_view: true,
    serviceID: "f3wgfeq3fq3gq3ef",
    provider_view: true,
    reservation_starts: "2026-04-26 14:00",
    reservation_ends: "2026-04-26 16:00",
    regular: true,
    edited: false,
    status: "Active"
  },
  {
    id: "gen5e4twgw5yrj5h",
    clientID: "mock-client-1",
    client_view: true,
    serviceID: "gh4534g2rf23g",
    provider_view: true,
    reservation_starts: "2026-04-29 18:00",
    reservation_ends: "2026-04-29 19:00",
    regular: true,
    edited: false,
    status: "Active"
  },
  {
    id: "wrgh5ehmr6j5ht4g",
    clientID: "mock-client-2",
    client_view: true,
    serviceID: "32rqty57o9809",
    provider_view: true,
    reservation_starts: "2026-04-25 13:00",
    reservation_ends: "2026-04-25 15:00",
    regular: true,
    edited: false,
    status: "Active"
  },
  {
    id: "gw4ghw4hw4tgr",
    clientID: "mock-client-3",
    client_view: true,
    serviceID: "32rqty57o9809",
    provider_view: true,
    reservation_starts: "2026-04-25 17:00",
    reservation_ends: "2026-04-25 19:00",
    regular: true,
    edited: false,
    status: "Active"
  },
];

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
router.get("/", async (req, res) => {
  let result = reservations;

  const filters = req.query;

  if (filters.clientID) {
    result = result.filter(r => r.clientID === filters.clientID);
  }

  const serviceIds = [...new Set(result.map(r => r.serviceID))];

  const services = serviceIds.map(id => findServiceByID(id));

  const serviceMap = {};
  services.forEach(s => {
    if (s) serviceMap[s.id] = s;
  });

  const enriched = result.map(r => ({
    ...r,
    service: serviceMap[r.serviceID] || null
  }));

  res.json(enriched);
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
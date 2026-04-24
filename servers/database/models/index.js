const mongoose = require('mongoose');

// 1. User
const userSchema = new mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    gender: { type: String },
    mail: { type: String, required: true },
    phone_number: { type: String },
    birthdate: { type: Date },
    address: { type: String },
    user_type: { type: String, enum: ['Client', 'Provider', 'Administrator'], required: true },
    notification_turn: { type: Boolean, default: true },
    blocked: { type: Boolean, default: false }
});

// 2. Category
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String }
});

// 3. Service
const serviceSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    description: { type: String },
    working_days: [{ type: String }],
    hour_start: { type: String, required: true },
    hour_end: { type: String, required: true },
    slot_duration: { type: Number, required: true },
    banned_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    active: { type: Boolean, default: true }
});

// 4. Reservation
const reservationSchema = new mongoose.Schema({
    clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    client_view: { type: Boolean, default: true },
    serviceID: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    provider_view: { type: Boolean, default: true },
    reservation_starts: { type: Date, required: true },
    reservation_ends: { type: Date, required: true },
    regular: { type: Boolean, default: true },
    edited: { type: Boolean, default: false },
    status: { type: String, enum: ['Active', 'Canceled', 'Finished'], default: 'Active' }
});

// 5. Review
const reviewSchema = new mongoose.Schema({
    clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceID: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    quality: { type: Number, min: 1, max: 5, required: true },
    message: { type: String }
});

// 6. Notification
const notificationSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceID: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    notification_type: { type: String, required: true },
    message: { type: String, required: true }
});

// 7. Log
const logSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    message: { type: String, required: true },
    log_date: { type: Date, default: Date.now }
});

module.exports = {
    User: mongoose.model('User', userSchema),
    Category: mongoose.model('Category', categorySchema),
    Service: mongoose.model('Service', serviceSchema),
    Reservation: mongoose.model('Reservation', reservationSchema),
    Review: mongoose.model('Review', reviewSchema),
    Notification: mongoose.model('Notification', notificationSchema),
    Log: mongoose.model('Log', logSchema)
};
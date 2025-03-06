const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pickupPoint: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
});

module.exports = mongoose.model("Booking", BookingSchema);

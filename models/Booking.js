// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  petType: { type: String, required: true },      // e.g., cat, dog, etc.
  service: { type: String, required: true },        // e.g., grooming, check-up
  date: { type: Date, required: true },             // appointment date
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);

const express = require('express');
const Booking = require('../models/Booking');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, // amount in cents
      currency: 'usd',
      metadata: { bookingId: booking._id.toString() },
    });

    res.status(201).json({ booking, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
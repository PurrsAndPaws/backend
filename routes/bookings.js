const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');

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

router.post('/create-booking', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.status(200).send(paymentIntent);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Add this after your existing routes
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
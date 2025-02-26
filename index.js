require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies

const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });

const mongoURI = process.env.MONGO_URI;

// const uri = "mongodb+srv://towersharry0:Wasspord321@cluster0.fn4n7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!mongoURI) {
  console.error('MongoDB connection error: MONGO_URI is not defined.');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});



// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the PurrsAndPaws backend!');
});

// Register the bookings route
const bookingsRouter = require('./routes/bookings');
app.use('/api/bookings', bookingsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'https://ngoassignment.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

// Middleware
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.use(express.json());

// MongoDB connection
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ngo';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB Connected Successfully...'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.json({
    message: 'NGO backend is running',
    api: '/api',
  });
});

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/submissions', require('./routes/submissions'));

// Fallback Route for non-existent endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: 'API route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import processRoutes from './routes/processRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());

// Add routes
app.use('/api', processRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    details: err.message
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
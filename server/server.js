const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mediaRoutes = require('./routes/media');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', mediaRoutes);

// Serve Static Frontend in Production
if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NGMEE Media Engine' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: err.message || 'Something went wrong on our end.' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 NGMEE Engine running on port ${PORT}`);
});

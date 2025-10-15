const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prayer-tracker';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Prayer Reading Schema
const prayerReadingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['سوره فتح', 'دعای توسل', 'دعای چهاردهم']
  },
  date: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/
  },
  count: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Create compound index for efficient queries
prayerReadingSchema.index({ name: 1, date: 1 }, { unique: true });

const PrayerReading = mongoose.model('PrayerReading', prayerReadingSchema);

// Routes

// Get today's statistics
app.get('/api/stats/today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const stats = await PrayerReading.find({ date: today });
    
    const result = {
      'سوره فتح': 0,
      'دعای توسل': 0,
      'دعای چهاردهم': 0
    };
    
    stats.forEach(stat => {
      result[stat.name] = stat.count;
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get statistics for a specific date range
app.get('/api/stats/range', async (req, res) => {
  try {
    const { startDate, endDate, name } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    
    const query = {
      date: {
        $gte: startDate,
        $lte: endDate
      }
    };
    
    if (name) {
      query.name = name;
    }
    
    const stats = await PrayerReading.find(query).sort({ date: 1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get monthly statistics for calendar
app.get('/api/stats/month', async (req, res) => {
  try {
    const { year, month, name } = req.query;
    
    if (!year || !month) {
      return res.status(400).json({ error: 'year and month are required' });
    }
    
    const startDate = `${year}-${month.padStart(2, '0')}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];
    
    const query = {
      date: {
        $gte: startDate,
        $lte: endDate
      }
    };
    
    if (name) {
      query.name = name;
    }
    
    const stats = await PrayerReading.find(query).sort({ date: 1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Increment reading count
app.post('/api/read', async (req, res) => {
  try {
    const { name, date } = req.body;
    
    if (!name || !date) {
      return res.status(400).json({ error: 'name and date are required' });
    }
    
    if (!['سوره فتح', 'دعای توسل', 'دعای چهاردهم'].includes(name)) {
      return res.status(400).json({ error: 'Invalid prayer name' });
    }
    
    const result = await PrayerReading.findOneAndUpdate(
      { name, date },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
    
    res.json({ success: true, count: result.count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
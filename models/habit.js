// models/habit.js

const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  date: Date,
  status: String, // 'Done', 'Not Done', or 'None'
});

const habitSchema = new mongoose.Schema({
  name: String,
  description: String,
  user: String,
  statuses: [statusSchema], // Array to store daily statuses
  // Fields to store statuses for the past 7 days
  day1: statusSchema,
  day2: statusSchema,
  day3: statusSchema,
  day4: statusSchema,
  day5: statusSchema,
  day6: statusSchema,
  day7: statusSchema,
});

module.exports = mongoose.model('Habit', habitSchema);

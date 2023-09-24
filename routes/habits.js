const express = require('express');
const router = express.Router();
const Habit = require('../models/habit');

// Index Route
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find({});
    res.render('index', { habits });
  } catch (error) {
    console.error('Error fetching habits:', error);
    res.status(500).send('Server Error');
  }
});

// New Route (form to add a new habit)
router.get('/new', (req, res) => {
  res.render('new');
});

// Create Route (add a new habit)
router.post('/', async (req, res) => {
  try {
    await Habit.create(req.body.habit);
    res.redirect('/habits');
  } catch (error) {
    console.error('Error creating habit:', error);
    res.status(500).send('Server Error');
  }
});

// Edit Route (form to edit a habit)
router.get('/:id/edit', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    res.render('edit', { habit });
  } catch (error) {
    console.error('Error fetching habit for edit:', error);
    res.status(500).send('Server Error');
  }
});

// Update Route (update a habit)
router.put('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndUpdate(req.params.id, req.body.habit);
    res.redirect('/habits');
  } catch (error) {
    console.error('Error updating habit:', error);
    res.status(500).send('Server Error');
  }
});

// Delete Route (delete a habit)
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndRemove(req.params.id);
    res.redirect('/habits');
  } catch (error) {
    console.error('Error deleting habit:', error);
    res.status(500).send('Server Error');
  }
});



// Define a route handler to mark today's habit
router.post('/:id/mark', async (req, res) => {
    try {
      const habit = await Habit.findById(req.params.id);
      if (!habit) {
        return res.status(404).send('Habit not found');
      }
  
      // Assuming you have a method to mark today's habit
      // and update the `statuses` array in your model
      const newStatus = 'Done'; // or 'Not Done', 'None', depending on your form
      habit.statuses.push({
        date: new Date(),
        status: newStatus,
      });
  
      await habit.save();
      res.redirect('/habits'); // Redirect back to the habit list
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

// Define a route handler to change the status of a habit
router.post('/:id/change-status', async (req, res) => {
    try {
      const habit = await Habit.findById(req.params.id);
      if (!habit) {
        return res.status(404).send('Habit not found');
      }
  
      const newStatus = req.body.newStatus; // Assuming you have a select element with the name "newStatus" in your form
      // Update the status for today or any specific day as needed
      // For example, if you want to update today's status:
      const todayStatus = habit.statuses.find((status) =>
        isSameDay(new Date(status.date), new Date())
      );
      if (todayStatus) {
        todayStatus.status = newStatus;
      }
  
      await habit.save();
      res.redirect('/habits'); // Redirect back to the habit list
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Helper function to compare if two dates are the same day
  function isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
  

module.exports = router;

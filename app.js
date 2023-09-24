const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const db = require('./config/mongoose');
// mongoose.connect('mongodb://localhost/habittracker', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Helper function to format dates (e.g., "Sep 22, 2023")
app.locals.formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
// Routes
const habitRoutes = require('./routes/habits');
app.use('/habits', habitRoutes);

app.get('/', (req, res) => {
  res.redirect('/habits');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

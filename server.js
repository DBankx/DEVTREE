require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 6000;
const app = express();
const connectToDB = require('./db');
const cors = require('cors');
const path = require('path');

// connection to database
connectToDB();

// middlewares
app.use(express.json({ extended: false }));
app.use(cors());

// routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/authenticate'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/post'));

// server static assests in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`your port has started on port ${port}`);
});

require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 6000;
const app = express();
const connectToDB = require('./db');

// connection to database
connectToDB();

// middlewares
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('welcome to dev tree');
});

// routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/authenticate'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/post'));

app.listen(port, () => {
  console.log(`your port has started on port ${port}`);
});

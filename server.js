require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dbURI = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/submit', async (req, res) => {
  const { name, password } = req.body;

  try {
    const newUser = new User({ name, password });
    await newUser.save();
    res.json({ message: 'User data saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving data' });
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//to show users
app.get('/users', async (req, res) => {
    const users = await User.find({});
    res.json(users);
  });
  
// Load dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Use middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (make sure your MongoDB is running)
mongoose.connect('mongodb+srv://raw:rishi123@todo.ya8oe.mongodb.net/?retryWrites=true&w=majority&appName=ToDo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Use our to-do routes
app.use('/todos', todoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

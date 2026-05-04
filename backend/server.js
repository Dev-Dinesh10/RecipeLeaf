require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const errorHandler = require('./middleware/errorHandler');

// Connect to Database
connectDB();

const path = require('path');
const app = express();

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Security Middleware
app.use(helmet());
app.use(cors());

const cuisineRoutes = require('./routes/cuisineRoutes');

// Body Parser
app.use(express.json());

const dashboardRoutes = require('./routes/dashboardRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/cuisines', cuisineRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({ message: "RecipeLeaf API is running" });
});

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

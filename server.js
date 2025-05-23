require("dotenv").config();
const express = require("express");
const cors = require("cors");
const emailRoutes = require('./routes/email.routes');
const userRoutes = require('./routes/user.routes');
const { PrismaClient } = require("@prisma/client");
const authRoutes = require('./routes/auth.routes');
const dashRoutes = require('./routes/dashboard.routes');
const app = express();
const prisma = new PrismaClient();

// CORS setup
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/email', emailRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashRoutes);


app.get("/", (req, res) => {
    res.send("Mail API is running...");
  });

  async function checkDatabaseConnection() {
    try {
      await prisma.$connect();
      console.log("✅ Database connected!");
    } catch (error) {
      console.error("❌ Database connection failed!", error);
    }
  }

// Start Server
const PORT = process.env.PORT || 5000;
app.get(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  await checkDatabaseConnection();
});

module.exports = app;

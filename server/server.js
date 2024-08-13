const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Importing Routes
const authRoutes = require("./routes/auth");
const fundRoutes = require("./routes/funds"); // Route for funds
const dashboardRoutes = require("./routes/dashboard"); // Route for dashboard

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection String
const mongoURI =
  "mongodb+srv://sr5553:Bobby1024@fosure.ulkea.mongodb.net/fosure?retryWrites=true&w=majority";

// Connecting to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API Routes
app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/funds", fundRoutes); // Fund routes
app.use("/api/dashboard", dashboardRoutes); // Dashboard routes

// Serve static assets if in production
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

// Port Configuration
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

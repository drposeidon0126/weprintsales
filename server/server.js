const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require("cors");
const uploadFile = require("./middleware/upload");
const auth = require("./middleware/auth");
const mg = require("mailgun-js");
require("dotenv").config();

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

const app = express();

global.__baseurl = __dirname;
// Connect to MongoDB
connectDB();

// Initialize middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// app.use(express.json({ extended: false }));
// app.use(express.urlencoded({ extended: true }))
app.use(uploadFile);
app.use(cors());

// Routes
app.use("/api/domains", require("./routes/api/old/domains"));
app.use("/api/petTypes", require("./routes/api/old/petTypes"));
app.use("/api/petDescriptions", require("./routes/api/old/petDescriptions"));
app.use("/api/breeders", require("./routes/api/old/breeders"));
app.use("/api/liters", require("./routes/api/old/liters"));
app.use("/api/babies", require("./routes/api/old/babies"));
app.use("/api/reservations", require("./routes/api/old/reservations"));
app.use("/api/file", require("./routes/api/old/file.controller"));
//new
app.use("/api/users", require("./routes/api/users"));
app.use("/api/orders", auth, require("./routes/api/orders"));
app.use("/api/order-details", require("./routes/api/orderDetails"));
app.use("/api/customers", require("./routes/api/customers"));

app.use(express.static("resources/assets"));
// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("resource/assets"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
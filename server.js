const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

// connect to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// app middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://law-firm-system-client.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(cors());
/* app.use(cors({
  origin: "https://rent-ncar-client.onrender.com",
  headers: ["Content-Type"],
  credentials: true,
})); */
/* app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3000', 'https://rent-ncar-client.onrender.com', 'http://rent-ncar-client.onrender.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
}); */

// routes attached with server
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/rentCarUpload"));
app.use("/api", require("./routes/sellCarUpload"));
app.use("/api", require("./routes/rentCar"));
app.use("/api", require("./routes/sellCar"));
app.use("/api", require("./routes/carListData"));
app.use("/api", require("./routes/hostDataInfo"));
app.use("/api", require("./routes/searchCar"));
app.use("/api", require("./routes/rentCarPayment"));
app.use("/api", require("./routes/bookRentCar"));
app.use("/api", require("./routes/renterDataInfo"));
app.use("/api", require("./routes/superAdminDataInfo"));
app.use("/api", require("./routes/favourite"));
app.use("/api", require("./routes/superAdmin"));
app.use("/api", require("./routes/reviewDataToHost"));

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

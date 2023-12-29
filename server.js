const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
// const corsHandler = require("./middleware/corsHandler");

/** Connect to mongoDB database */
connectDb();

const app = express();

/** CORS Middleware */
// app.use(corsHandler);
app.use(
  cors({
    origin: process.env.FRONTEND.split(" "),
    // origin: ["http://127.0.0.1:5173", "http://127.0.0.1:8000"],
  })
);

/** Parser Middleware */
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.json());

/** Routes Middleware */
// app.get("/", function (req, res) {
//   res.send("Hello World");
// });
app.use("/api/nav", require("./routes/navRoutes"));
app.use("/api/contents", require("./routes/contentRoutes"));
app.use("/api/experiences", require("./routes/experienceRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

/** Error Handler Middleware */
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Node API app is running on port ${port}`);
});

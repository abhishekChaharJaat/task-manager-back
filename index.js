const connectToMongo = require("./cdb");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = 2000;

const allowedOrigins = [
  "http://localhost:3000", // Local frontend
  "https://abhisheks-taskora.vercel.app/", // Your production domain
];

// ✅ CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Optional: if you're using cookies/auth headers
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

// const connectToMongo = require("./cdb");
// const express = require("express");
// const cors = require("cors");
// connectToMongo();

// const app = express();
// const port = 2000;
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/tasks", require("./routes/tasks"));

// // app.get("/", (req, res) => {
// //   res.send("Hello World");
// // });

// app.listen(port, () => {
//   console.log(`App listen on port http://localhost:${port}`);
// });

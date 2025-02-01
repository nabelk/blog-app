const express = require("express");
const app = express();
const passport = require("passport");
const jwtStrategy = require("./config/passport-jwt.js");
const routers = require("./routes/routers.js");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
  })
);
app.use(
  cors({
    origin: [process.env.URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
passport.use(jwtStrategy);

app.use("/admin", routers.adminRouter);
app.use("/api", routers.clientRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server connecting at PORT ${PORT}`);
});

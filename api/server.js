const express = require("express");
const app = express();
const passport = require("passport");
const jwtStrategy = require("./config/passport-jwt.js");
const routers = require("./routes/routers.js");
const cors = require("cors");
const { rateLimit, ipKeyGenerator } = require("express-rate-limit");
const helmet = require("helmet");

app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
    validate: { keyGeneratorIpFallback: false },
    keyGenerator: (req) => {
      const cfIp = req.headers["cf-connecting-ip"];
      if (typeof cfIp === "string") {
        console.log(`[Rate Limit] CF-IP: ${cfIp}`);
        return cfIp;
      }

      const xForwardedFor = req.headers["x-forwarded-for"];
      if (typeof xForwardedFor === "string") {
        const ip = xForwardedFor.split(",")[0].trim();
        console.log(`[Rate Limit] X-Forwarded-For: ${ip}`);
        return ip;
      }
      if (Array.isArray(xForwardedFor) && xForwardedFor[0]) {
        const ip = xForwardedFor[0].split(",")[0].trim();
        console.log(`[Rate Limit] X-Forwarded-For (array): ${ip}`);
        return ip;
      }
      const fallbackIp = ipKeyGenerator(req.ip || "unknown");
      console.log(`[Rate Limit] Fallback IP: ${fallbackIp}`);
      return fallbackIp;
    },
  })
);
app.use(
  cors({
    origin: process.env.URL,
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

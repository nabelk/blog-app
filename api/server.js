const express = require("express");
const app = express();
const passport = require("passport");
const jwtStrategy = require("./config/passport-jwt.js");
const routers = require("./routes/routers.js");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
passport.use(jwtStrategy);

app.use("/admin", routers.adminRouter);
app.use("/api", routers.clientRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server connecting at PORT ${PORT}`);
});

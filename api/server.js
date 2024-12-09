const express = require("express");
const app = express();
const passport = require("passport");
const jwtStrategy = require("./config/passport-jwt.js");
const routers = require("./routes/routers.js");

app.use(express.urlencoded({ extended: true }));
passport.use(jwtStrategy);

app.use("/admin", routers.authRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server connecting at PORT ${PORT}`);
});

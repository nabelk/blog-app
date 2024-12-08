const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const prisma = require("../prisma/queries");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = new JwtStrategy(options, async (payload, done) => {
  try {
    const admin = await prisma.findAdmin(payload.email, payload.id);
    if (admin) {
      return done(null, admin);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

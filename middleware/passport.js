const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { Auth } = require("../models/models");

var options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_PRIVATEKEY,
};

const passportJWT = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await Auth.findOne({
          where: { id: payload.id },
        });

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        console.log("err", err);
      }
    })
  );
};

module.exports = {
  passportJWT,
};

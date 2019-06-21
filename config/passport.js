const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("./../database/models/user_model");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

passport.use(new LocalStrategy({
        usernameField: "email",
        session: false
    },
    async (email, password, done) => {
        const user = await UserModel.findOne({ email })
            .catch(done);

        if (user && user.verifyPasswordSync(password)) {
            return done(null, user);
        }

        return done(null, false);
    }
));

passport.use(new JwtStrategy(
  {
    jwtFromRequest: (req) => {
      let token = null;

      if (req && req.cookies) {
        token = req.cookies['jwt'];
      }

      return token;
    },
    secretOrKey: process.env.JWT_SECRET
  },
  async (jwt_payload, done) => {
    const user = await UserModel.findById(jwt_payload.sub)
      .catch(done);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
  }
));

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google"
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    let user = await UserModel.findOne({ email });
    if (user) {
      return done(null, user);
    }

    user = await UserModel.create({ email, password: 'testing1' });

    return done(null, user);
  }
));
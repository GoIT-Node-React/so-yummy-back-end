const { Strategy } = require('passport-google-oauth2');
const passport = require('passport');
const crypto = require('crypto');
const { nanoid } = require('nanoid');
const { user: userService, auth: authService } = require('../services');

const { SERVER_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${SERVER_URL}/api/auth/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (_req, _accessToken, _refreshToken, profile, done) => {
  try {
    const { email, displayName, picture } = profile;

    const user = await userService.getUserByEmail(email);

    if (user) {
      // Add user to request (req.user)
      return done(null, user);
    }

    const password = nanoid();
    const verificationToken = crypto.randomUUID();

    const newUser = await authService.register({
      name: displayName,
      email,
      password,
      avatarURL: picture,
      verificationToken,
    });

    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

module.exports = passport;

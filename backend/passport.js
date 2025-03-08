const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'emails']
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookId: profile.id }, async (err, user) => {
    if (err) return done(err);
    if (user) {
      return done(null, user);
    }
    const newUser = new User({
      facebookId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    });
    await newUser.save();
    done(null, newUser);
  });
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }, async (err, user) => {
    if (err) return done(err);
    if (user) {
      return done(null, user);
    }
    const newUser = new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    });
    await newUser.save();
    done(null, newUser);
  });
}));
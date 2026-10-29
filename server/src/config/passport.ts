import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { env } from './env';

export function configurePassport(): void {
  // ── Local (email + password) ──────────────────────────
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) return done(null, false, { message: 'Invalid credentials' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: 'Invalid credentials' });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  // ── JWT (Bearer token) ────────────────────────────────
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: env.jwt.secret,
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.sub);
          if (!user) return done(null, false);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  // ── Facebook OAuth ────────────────────────────────────
  if (env.facebook.appId) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: env.facebook.appId,
          clientSecret: env.facebook.appSecret,
          callbackURL: env.facebook.callbackUrl,
          profileFields: ['id', 'emails', 'displayName', 'photos'],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value ?? `fb_${profile.id}@noemail.local`;
            let user = await User.findOne({ oauthProvider: 'facebook', oauthId: profile.id });
            if (!user) {
              user = await User.findOne({ email });
            }
            if (!user) {
              user = await User.create({
                email,
                username: profile.displayName.replace(/\s+/g, '_').toLowerCase(),
                oauthProvider: 'facebook',
                oauthId: profile.id,
                photo: profile.photos?.[0]?.value,
                emailVerified: true,
              });
            }
            return done(null, user);
          } catch (err) {
            return done(err as Error);
          }
        },
      ),
    );
  }
}

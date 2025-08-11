import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

// Type for the JWT callback parameters
interface JWTParams {
  token: JWT;
  user?: any;
  trigger?: 'signIn' | 'signUp' | 'update';
  session?: any;
}

// Type for the session callback parameters
interface SessionParams {
  session: any;
  token: JWT;
}

// Type for the redirect callback parameters
interface RedirectParams {
  url: string;
  baseUrl: string;
}

/**
 * NextAuth configuration for in-memory authentication
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig: NextAuthOptions = {
  // Custom pages
  pages: {
    signIn: '/login',
    error: '/login',
  },
  // Session configuration
  session: {
    strategy: 'jwt',
  },
  // Callbacks for JWT and session handling
  callbacks: {
    async jwt({ token, user, trigger, session }: JWTParams) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role || 'USER'; // Default role for in-memory users
      }
      
      // Update session with updated user data
      if (trigger === 'update' && session?.user) {
        token = { ...token, ...session.user };
      }
      
      return token;
    },
    async session({ session, token }: SessionParams) {
      // Add user data to session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }: RedirectParams) {
      // Redirect to the intended URL after sign in
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      try {
        const urlObj = new URL(url);
        if (urlObj.origin === baseUrl) return url;
      } catch (e) {
        // Invalid URL, return base URL
      }
      return baseUrl;
    },
  },
  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',
  // Secret for JWT encryption
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-for-development',
  // Custom session token
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  // Configure one or more authentication providers
  providers: [
    // Add your authentication providers here
  ],
  // Use secure cookies in production
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax' as const,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
};

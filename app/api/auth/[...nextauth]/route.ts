import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import inMemoryStore from '@/lib/in-memory-store';

// Log initial state for debugging
console.log('Initial users in store:', inMemoryStore.getUsers().map((u: { id: string; email: string; name: string }) => ({
  id: u.id,
  email: u.email,
  name: u.name
})));

// Debug: Log when the module is loaded
console.log('=== NEXT AUTH MODULE LOADED ===');

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          console.log('\n=== AUTHORIZE CALLED ===');
          console.log('Request method:', req?.method);
          console.log('Request headers:', JSON.stringify(req?.headers, null, 2));
          
          if (!credentials?.email || !credentials?.password) {
            console.error('❌ Missing credentials');
            throw new Error('Email and password are required');
          }

          console.log('🔍 Checking credentials for email:', credentials.email);
          
          // Get all users for debugging
          const allUsers = inMemoryStore.getUsers();
          console.log('📋 Current users in store:', JSON.stringify(allUsers, null, 2));
          
          // Find user using our in-memory store
          const user = inMemoryStore.findUserByEmail(credentials.email);
          
          if (!user) {
            console.error('❌ User not found');
            console.error('🔍 Looking for email:', credentials.email);
            console.error('📋 Available emails:', allUsers.map(u => u.email));
            throw new Error('No user found with this email');
          }

          console.log('✅ User found:', { 
            id: user.id, 
            email: user.email,
            name: user.name,
            storedPassword: user.password,
            providedPassword: credentials.password,
            passwordMatch: credentials.password === user.password
          });

          // In a real app, you would hash the password and compare
          if (credentials.password !== user.password) {
            console.error('❌ Password mismatch');
            console.error('🔑 Provided password length:', credentials.password.length);
            console.error('🔑 Stored password length:', user.password.length);
            console.error('🔍 First 3 chars of provided password:', credentials.password.substring(0, 3) + '...');
            console.error('🔍 First 3 chars of stored password:', user.password.substring(0, 3) + '...');
            throw new Error('Invalid password');
          }
          
          console.log('✅ Authentication successful for user:', user.email);

          // If we get here, the credentials are valid
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image
          };
        } catch (error) {
          // Convert any errors to a format that NextAuth can handle
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error('An unknown error occurred');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login?error=AuthenticationFailed',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-for-development',
  debug: process.env.NODE_ENV === 'development',
  // Debug logging for development
  logger: process.env.NODE_ENV === 'development' ? {
    error(code, metadata) {
      console.error('Auth error:', { code, metadata });
    },
    warn(code) {
      console.warn('Auth warning:', code);
    },
    debug(code, metadata) {
      console.log('Auth debug:', { code, metadata });
    }
  } : undefined,
});

export { handler as GET, handler as POST };

// This file configures the NextAuth.js API route for handling authentication.
// It uses the CredentialsProvider for email/password authentication.
// The configuration is extended from the shared auth.config.ts file.
// The authorize function handles user lookup and password verification.

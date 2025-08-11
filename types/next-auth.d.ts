import 'next-auth';

declare module 'next-auth' {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }

  /**
   * Extend the built-in user types
   */
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  /**
   * Extend the built-in account types
   */
  interface Account {}

  /**
   * Extend the built-in profile types
   */
  interface Profile {}
}

declare module 'next-auth/jwt' {
  /**
   * Extend the built-in JWT types
   */
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
    iat?: number;
    exp?: number;
    jti?: string;
  }
}

// Extend the NodeJS namespace to include our custom environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // NextAuth
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      
      // Database
      DATABASE_URL: string;
      
      // OAuth providers (example)
      GOOGLE_CLIENT_ID?: string;
      GOOGLE_CLIENT_SECRET?: string;
      
      // Other environment variables
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

"use client";

import { useSession, signIn, signOut } from 'next-auth/react';
import type { Session, DefaultSession } from 'next-auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';

// Extend the default session type to include our custom fields
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string | null;
    } & DefaultSession['user'];
  }
}

// Extend the JWT type to include our custom fields
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role?: string;
  }
}

interface UseAuthOptions {
  required?: boolean;
  redirectTo?: string;
  redirectIfFound?: boolean;
}

interface UseAuthReturn {
  user: Session['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  refreshSession: () => Promise<void>;
}

export function useAuth({
  required = false,
  redirectTo = '/login',
  redirectIfFound = false,
}: UseAuthOptions = {}): UseAuthReturn {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [error, setError] = useState<Error | null>(null);
  
  const isLoading = status === 'loading';
  const user = session?.user || null;
  const isAuthenticated = !!user;

  // Handle redirects based on authentication state
  useEffect(() => {
    if (isLoading) return;
    
    // If authentication is required and user is not authenticated, redirect to login
    if (required && !isAuthenticated) {
      const callbackUrl = pathname !== '/login' ? `?callbackUrl=${encodeURIComponent(pathname)}` : '';
      router.push(`${redirectTo}${callbackUrl}`);
    }
    
    // If redirectIfFound is true and user is authenticated, redirect to home
    if (redirectIfFound && isAuthenticated) {
      const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/';
      router.push(callbackUrl);
    }
  }, [isAuthenticated, isLoading, pathname, redirectIfFound, redirectTo, required, router]);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      console.log('Attempting login with email:', email);
      
      const result = await signIn('credentials', {
        redirect: false,
        email: email.toLowerCase().trim(),
        password,
        callbackUrl: '/',
      });

      console.log('SignIn result:', {
        error: result?.error,
        status: result?.status,
        ok: result?.ok,
        url: result?.url
      });

      if (result?.error) {
        console.error('Login failed with error:', result.error);
        throw new Error(result.error);
      }

      if (!result?.ok) {
        console.error('Login failed with status:', result?.status);
        throw new Error('Login failed. Please try again.');
      }

      console.log('Login successful, refreshing session...');
      await update(); // Refresh the session
      
    } catch (err) {
      console.error('Login error details:', {
        error: err,
        isError: err instanceof Error,
        message: err instanceof Error ? err.message : 'Unknown error'
      });
      
      const error = err instanceof Error ? err : new Error('Login failed');
      setError(error);
      throw error;
    }
  }, [update]); // Make sure to include update in the dependency array

  const signUp = useCallback(async (
    email: string, 
    password: string, 
    name: string
  ): Promise<void> => {
    try {
      setError(null);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.toLowerCase().trim(), 
          password, 
          name: name.trim() 
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific error messages from the API
        if (data.error) {
          throw new Error(data.error);
        }
        throw new Error('Registration failed. Please try again.');
      }

      // Auto-login after successful registration
      try {
        await login(email, password);
      } catch (loginError) {
        // If auto-login fails, redirect to login page with success message
        console.error('Auto-login after registration failed:', loginError);
        window.location.href = '/login?registered=true';
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      const error = new Error(errorMessage);
      setError(error);
      console.error('Signup error:', error);
      throw error;
    }
  }, [login]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      await signOut({ 
        redirect: false,
        callbackUrl: '/login'
      });
      router.push('/login');
      router.refresh();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Logout failed');
      setError(error);
      console.error('Logout error:', error);
      throw error;
    }
  }, [router]);

  const refreshSession = useCallback(async (): Promise<void> => {
    try {
      await update();
    } catch (err) {
      console.error('Failed to refresh session:', err);
    }
  }, [update]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    signUp,
    refreshSession,
  };
}

// Helper hook for components that require authentication
export function useRequireAuth(redirectTo = '/login') {
  const { user, isAuthenticated, isLoading } = useAuth({ required: true, redirectTo });
  return { user, isAuthenticated, isLoading };
}

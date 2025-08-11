// Shared in-memory user store for development
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
}

// Use a module-level variable to maintain state between requests
let users: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123', // In a real app, this would be hashed
    image: null
  }
];

// Log initial state
console.log('AuthStore initialized with users:', users);

// Export the auth store functions
export const authStore = {
  // Find user by email (case-insensitive)
  findUserByEmail: (email: string): User | undefined => {
    try {
      const normalizedEmail = email.toLowerCase().trim();
      console.log('Looking for user with email:', normalizedEmail);
      const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
      console.log('User found:', user ? 'Yes' : 'No');
      return user;
    } catch (error) {
      console.error('Error in findUserByEmail:', error);
      return undefined;
    }
  },

  // Add a new user
  addUser: (user: Omit<User, 'id' | 'image'>): User => {
    try {
      const newUser = {
        ...user,
        id: (users.length + 1).toString(),
        image: null
      };
      users.push(newUser);
      console.log('New user added. Current users:', users);
      return newUser;
    } catch (error) {
      console.error('Error in addUser:', error);
      throw error;
    }
  },

  // Get all users (for debugging)
  getUsers: (): User[] => {
    return [...users]; // Return a copy to prevent external modifications
  },
  
  // For testing: reset to initial state
  _reset: (): void => {
    users = [
      {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'password123',
        image: null
      }
    ];
    console.log('AuthStore reset to initial state');
  },
  
  // For debugging
  _getState: (): { users: User[] } => {
    return { users: [...users] };
  }
};

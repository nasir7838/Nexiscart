// In-memory store that maintains state between requests
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
}

// Use a module-level variable to maintain state
let users: User[] = [];

// Initialize with demo user on first load
if (users.length === 0) {
  users.push({
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    image: null
  });
  console.log('Initialized in-memory store with demo user');
}

export const inMemoryStore = {
  // Find user by email (case-insensitive)
  findUserByEmail: (email: string): User | undefined => {
    const normalizedEmail = email.toLowerCase().trim();
    return users.find(user => user.email.toLowerCase() === normalizedEmail);
  },

  // Add a new user
  addUser: (user: Omit<User, 'id' | 'image'>): User => {
    const newUser = {
      ...user,
      id: (users.length + 1).toString(),
      image: null
    };
    users.push(newUser);
    return newUser;
  },

  // Get all users (for debugging)
  getUsers: (): User[] => {
    return [...users];
  },
  
  // For testing: reset to initial state
  _reset: (): void => {
    users = [{
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123',
      image: null
    }];
  }
};

export default inMemoryStore;

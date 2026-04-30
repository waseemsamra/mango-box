import { getDatabase } from '../index';

class AuthService {
  constructor() {
    this.db = null;
    this.currentUser = null;
  }

  async init() {
    this.db = getDatabase();
  }

  // Login user
  async login(email, password) {
    try {
      if (!this.db) {
        await this.init();
      }

      console.log('Attempting login for email:', email);
      console.log('Database collections available:', Object.keys(this.db.collections));

      // Find user by email (admin login uses email)
      const users = await this.db.collections.users.find({
        selector: {
          email: email,
          status: 'Active'
        }
      }).exec();

      console.log('Found users:', users.length);
      console.log('Users found:', users.map(u => u.toJSON()));

      if (users.length === 0) {
        // Let's check all users to see what's available
        const allUsers = await this.db.collections.users.find().exec();
        console.log('All users in database:', allUsers.map(u => u.toJSON()));
        throw new Error('User not found with this email');
      }

      const user = users[0].toJSON();

      // Simple password check (in production, use hashed passwords)
      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      // Update last login
      await this.db.collections.users.findOne(user.id).patch({
        lastLogin: new Date().toISOString()
      });

      // Remove password from user object before returning
      const { password: _, ...userWithoutPassword } = user;
      this.currentUser = userWithoutPassword;

      return userWithoutPassword;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Logout user
  async logout() {
    this.currentUser = null;
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.currentUser !== null;
  }

  // Check if user has specific permission
  hasPermission(permission) {
    if (!this.currentUser) return false;
    return this.currentUser.permissions.includes(permission);
  }

  // Check if user has specific role
  hasRole(role) {
    if (!this.currentUser) return false;
    return this.currentUser.role === role;
  }

  // Get user by ID
  async getUserById(userId) {
    try {
      if (!this.db) {
        await this.init();
      }

      const user = await this.db.collections.users.findOne(userId).exec();
      if (!user) {
        throw new Error('User not found');
      }

      const userJSON = user.toJSON();
      const { password: _, ...userWithoutPassword } = userJSON;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Create new user
  async createUser(userData) {
    try {
      if (!this.db) {
        await this.init();
      }

      const user = {
        ...userData,
        id: `user-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: userData.status || 'Active',
        lastLogin: null
      };

      const result = await this.db.collections.users.insert(user);
      const userJSON = result.toJSON();
      const { password: _, ...userWithoutPassword } = userJSON;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Update user
  async updateUser(userId, updateData) {
    try {
      if (!this.db) {
        await this.init();
      }

      const user = await this.db.collections.users.findOne(userId).exec();
      if (!user) {
        throw new Error('User not found');
      }

      const updatedUser = {
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      await user.patch(updatedUser);
      const userJSON = user.toJSON();
      const { password: _, ...userWithoutPassword } = userJSON;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      if (!this.db) {
        await this.init();
      }

      const user = await this.db.collections.users.findOne(userId).exec();
      if (!user) {
        throw new Error('User not found');
      }

      await user.remove();
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Get all users
  async getAllUsers() {
    try {
      if (!this.db) {
        await this.init();
      }

      const users = await this.db.collections.users.find().exec();
      return users.map(doc => {
        const userJSON = doc.toJSON();
        const { password: _, ...userWithoutPassword } = userJSON;
        return userWithoutPassword;
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();

import { getDatabase } from '../database';
import { authService } from '../database/services';

export const ensureAdminUser = async () => {
  try {
    console.log('Ensuring admin user exists...');
    
    const db = getDatabase();
    if (!db.collections.users) {
      throw new Error('Users collection not found');
    }

    // Check if admin user already exists
    const existingAdmin = await db.collections.users.find({
      selector: {
        email: 'admin@kisanfresh.com'
      }
    }).exec();

    if (existingAdmin.length > 0) {
      console.log('Admin user already exists');
      return existingAdmin[0].toJSON();
    }

    // Create admin user if it doesn't exist
    const adminUser = {
      id: 'user-1',
      name: 'admin',
      email: 'admin@kisanfresh.com',
      password: 'admin123',
      role: 'Admin',
      permissions: ['read', 'write', 'delete', 'manage'],
      status: 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null
    };

    const result = await db.collections.users.insert(adminUser);
    console.log('Admin user created successfully:', result.toJSON());
    return result.toJSON();
  } catch (error) {
    console.error('Error ensuring admin user:', error);
    throw error;
  }
};

export const testAdminLogin = async () => {
  try {
    console.log('Testing admin login...');
    
    // First ensure admin user exists
    await ensureAdminUser();
    
    // Test login
    const user = await authService.login('admin@kisanfresh.com', 'admin123');
    console.log('Admin login successful:', user);
    return user;
  } catch (error) {
    console.error('Admin login test failed:', error);
    throw error;
  }
};

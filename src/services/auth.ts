import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { User } from '@/types/models';

const JWT_SECRET = "KI7gqqc@";

export const generateToken = (user: User) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

// Create admin user if it doesn't exist
export const ensureAdminExists = async () => {
  try {
    const adminUser = await User.findOne({ email: 'admin' });
    if (!adminUser) {
      const hashedPassword = await hashPassword('admin');
      await User.create({
        email: 'admin',
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin'
      });
    }
  } catch (error) {
    console.error('Error ensuring admin exists:', error);
  }
};
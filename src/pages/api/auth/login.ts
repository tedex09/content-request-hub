import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateUser } from '@/services/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    const { token, user } = await authenticateUser(email, password);
    
    res.status(200).json({ 
      token, 
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        whatsapp: user.whatsapp
      }
    });
  } catch (error) {
    res.status(401).json({ 
      message: error instanceof Error ? error.message : 'Authentication failed' 
    });
  }
}
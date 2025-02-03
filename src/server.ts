import express from 'express';
import cors from 'cors';
import { ensureAdminExists } from './services/auth';
import dbConnect from './lib/db';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize database and create admin user
dbConnect().then(() => {
  ensureAdminExists();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
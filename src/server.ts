import express from 'express';
import cors from 'cors';
import dbConnect from './lib/db';
import { ensureAdminExists } from './services/auth';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to database and ensure admin user exists
dbConnect().then(() => {
  console.log('Connected to MongoDB');
  ensureAdminExists();
}).catch(console.error);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
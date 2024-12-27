import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import admin from 'firebase-admin';
import axios from 'axios';
import { initializeFirebase } from './utils/firebase';
import { authMiddleware } from './middleware/authMiddleware';
import { generateNewUser } from './services/userService';
import router from './routes/index';

dotenv.config();

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;

app.use(upload.any()); 
initializeFirebase();
app.use(express.json());


app.post('/api/generate-user', async (req: Request, res: Response): Promise<void> => {
  try {
    const { role } = req.body;

    if (!role || (role !== 'admin' && role !== 'user')) {
      res.status(400).json({ error: 'Invalid or missing role. Must be "admin" or "user".' });
    }

    const user = await generateNewUser(role);
    res.status(201).json({ message: 'User generated successfully', user });
  } catch (error) {
    console.error('Error generating user:', error);
    res.status(500).json({ error: 'Failed to generate user' });
  }
});

app.post('/api/sign-in', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Use Firebase Authentication REST API
    const authResponse = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const { localId, idToken } = authResponse.data;

    const customToken = await admin.auth().createCustomToken(localId);

    res.status(200).json({ message: 'Sign-in successful', idToken, customToken });
  } catch (error: any) {
    console.error('Error signing in:', error.response?.data || error.message);
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

app.use('/api', router);
app.use(authMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

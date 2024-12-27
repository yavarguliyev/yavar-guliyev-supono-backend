import admin from 'firebase-admin';
import { db } from './firestoreService';
import { User, userConverter } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

export const generateNewUser = async (role: 'admin' | 'user') => {
  try {
    const randomEmail = `user_${uuidv4()}@example.com`;
    const randomPassword = uuidv4();
    const userRecord = await admin.auth().createUser({ email: randomEmail, password: randomPassword });

    const user: User = {
      uid: userRecord.uid,
      email: userRecord.email!,
      displayName: userRecord.displayName || '',
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userDocRef = db.collection('users').doc(user.uid).withConverter(userConverter);
    await userDocRef.set(user);

    return { ...user, randomPassword };
  } catch (error) {
    console.error('Error generating new user:', error);

    throw error;
  }
};

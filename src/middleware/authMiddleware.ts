/// <reference path="../types/index.d.ts" />
import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const idToken = authorization.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (!decodedToken.email) {
      res.status(400).json({ error: 'Invalid token: email is missing' });
      return;
    }

    const userDoc = await admin.firestore().collection('users').doc(decodedToken.uid).get();
    if (!userDoc.exists) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: userDoc.data()?.role as 'admin' | 'user',
    };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const authorizeRole = (role: 'admin' | 'user') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      return;
    }

    next();
  };
};

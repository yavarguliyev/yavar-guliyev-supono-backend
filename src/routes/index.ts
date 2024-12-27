import { Router } from 'express';
import ImageController from '../controllers/ImageController';
import { authMiddleware, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/generateImage', authMiddleware, authorizeRole('admin'), ImageController.generateImageWrapper);

export default router;

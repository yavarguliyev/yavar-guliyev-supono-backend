import { Request, Response } from 'express';
import CloudinaryService from '../services/CloudinaryService';
import { db } from '../services/firestoreService';
import admin from 'firebase-admin';

class ImageController {
  private user: any;
  private imageUrl: string;
  private effect: string;
  private apiType: string;
  private cloudinaryService: CloudinaryService;

  constructor(user: any, imageUrl: string, effect: string, apiType: string) {
    this.user = user;
    this.imageUrl = imageUrl;
    this.effect = effect;
    this.apiType = apiType;
    this.cloudinaryService = new CloudinaryService();
  }

  private async applyImageEffect (): Promise<string> {
    let result: string;

    if (this.apiType === 'best') {
      result = await this.cloudinaryService.applyBestImageEffect(this.imageUrl, this.effect);
    } else if (this.apiType === 'worst') {
      result = await this.cloudinaryService.applyWorstImageEffect(this.imageUrl, this.effect);
    } else {
      throw new Error('Invalid apiType, must be "best" or "worst"');
    }

    return result;
  }

  private async saveImageResult (result: string): Promise<void> {
    const imageRef = db.collection('imageResults').doc();
    await imageRef.set({
      uid: this.user?.uid!,
      email: this.user?.email!,
      effect: this.effect,
      apiType: this.apiType,
      imageUrl: result,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  public async generateImage(req: Request, res: Response): Promise<void> {
    try {
      const { imageUrl, effect, apiType } = req.body;

      if (!imageUrl || !effect || !apiType) {
        res.status(400).json({ error: 'Missing imageUrl, effect, or apiType' });
        return;
      }

      const result = await this.applyImageEffect();
      await this.saveImageResult(result);

      res.json({ success: true, data: result });
    } catch (error: any) {
      const status = error?.http_code || 500;
      const message = error?.message || 'Internal Server Error';
      res.status(status).json({ error: message });
    }
  }

  public static async generateImageWrapper(req: Request, res: Response): Promise<void> {
    const { imageUrl, effect, apiType } = req.body;
    const user = req.user;

    const imageController = new ImageController(user, imageUrl, effect, apiType);
    await imageController.generateImage(req, res);
  }
}

export default ImageController;

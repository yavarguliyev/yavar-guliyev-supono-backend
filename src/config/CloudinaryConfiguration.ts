import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

class CloudinaryConfiguration {
  private static instance: CloudinaryConfiguration;

  private constructor() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  public static getInstance (): CloudinaryConfiguration {
    if (!CloudinaryConfiguration.instance) {
      CloudinaryConfiguration.instance = new CloudinaryConfiguration();
    }

    return CloudinaryConfiguration.instance;
  }

  public async uploadImage (file: string, options: cloudinary.UploadApiOptions) {
    try {
      const result = await cloudinary.v2.uploader.upload(file, options);

      return result;
    } catch (error: any) {
      throw new Error(`Error uploading image: ${error.message}`);
    }
  }
}

export default CloudinaryConfiguration;

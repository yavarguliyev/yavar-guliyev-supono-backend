import CloudinaryConfiguration from '../config/CloudinaryConfiguration';

class cloudinaryService {
  private cloudinaryConfiguration: CloudinaryConfiguration;

  constructor() {
    this.cloudinaryConfiguration = CloudinaryConfiguration.getInstance();
  }

  private async applyImageEffect (imageUrl: string, effect: string, transformations: any[]): Promise<string> {
    try {
      const result = await this.cloudinaryConfiguration.uploadImage(imageUrl, {
        transformation: [{ effect }, ...transformations]
      });

      return result.secure_url;
    } catch (error: any) {
      throw new Error(`Image Effect failed: ${error.message}`);
    }
  }

  public async applyBestImageEffect (imageUrl: string, effect: string): Promise<string> {
    const transformations = [{ quality: 'auto', fetch_format: 'auto' }];

    return this.applyImageEffect(imageUrl, effect, transformations);
  }

  public async applyWorstImageEffect (imageUrl: string, effect: string): Promise<string> {
    const transformations = [
      { quality: 20, fetch_format: 'jpg' },
      { dpr: 0.5 }
    ];

    return this.applyImageEffect(imageUrl, effect, transformations);
  }
}

export default cloudinaryService;

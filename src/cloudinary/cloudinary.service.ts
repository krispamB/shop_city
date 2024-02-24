import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadStream, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { CloudinaryResponse } from './cloudinary.responses';

@Injectable()
export class CloudinaryService {
  upload(
    file: Express.Multer.File,
    folder: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((reject, resolve) => {
      const upload: UploadStream = v2.uploader.upload_stream(
        { folder: `shop_city/${folder}` },
        (result, error) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadFiles(files: Array<Express.Multer.File>, folder: string) {
    const urls: string[] = [];
    try {
      for (const _file of files) {
        const result = await this.upload(_file, folder);
        urls.push(result.secure_url);
      }

      return urls;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while uploading image',
      );
    }
  }
}

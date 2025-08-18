// import { Injectable } from '@nestjs/common';
// import { UploadApiResponse, v2 } from 'cloudinary';
// import toStream from 'buffer-to-stream';

// @Injectable()
// export class FileUploadRepository {
//   async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
//     return new Promise((resolve, reject) => {
//       const upload = v2.uploader.upload_stream(
//         { resource_type: 'auto' },
//         (error, result) => {
//           if (error || !result) {
//             reject(
//               error instanceof Error
//                 ? error
//                 : new Error(String(error ?? 'upload result is undefined')),
//             );
//           } else {
//             resolve(result);
//           }
//         },
//       );
//       toStream(file.buffer).pipe(upload);
//     });
//   }
// }
import { Injectable } from '@nestjs/common';
import { v2, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import toStream from 'buffer-to-stream';

@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (error || !result) {
            reject(
              error instanceof Error
                ? error
                : new Error(
                    error && 'message' in error
                      ? error.message
                      : 'upload result is undefined',
                  ),
            );
          } else {
            resolve(result);
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}

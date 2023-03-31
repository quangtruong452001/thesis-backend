import { Injectable } from '@nestjs/common';
import { firebase } from '../utils/firebase/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { convertToSlug } from '../utils/helper';
import { InjectModel } from '@nestjs/mongoose';
import { imageDocument, Image } from '../model/image.schema';
import { Model } from 'mongoose';
import { imageDto } from '../dto/image.dto';
import { createWriteStream } from 'fs';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name)
    private imageModel: Model<imageDocument>,
  ) {}

  async createImage(image: any) {
    //TODO: change any to imageDto
    const { url, image_name } = image;
    const img = await this.imageModel.create({
      url: url,
      image_name: image_name,
    });
    return img;
  }

  // async uploadImage(file: any) {
  //   const storage = getStorage(firebase);
  //   // const imageRef = ref(storage, file.originalname);
  //   const imageRef = ref(storage, file.filename);
  //
  //   // console.log(file);
  //   // const name = file.originalname.split('.')[0];
  //   // const type = file.originalname.split('.')[1];
  //   const name = file.filename.split('.')[0];
  //   const type = file.mimetype.split('/')[1];
  //
  //   const metadata: any = {};
  //   if (type == 'png') {
  //     metadata.contentType = 'image/png';
  //   }
  //   if (type == 'jpg') {
  //     metadata.contentType = 'image/jpg';
  //   }
  //
  //
  //   await uploadBytes(imageRef, file.buffer, metadata);
  //   const downloadURL = await getDownloadURL(imageRef);
  //   // console.log(downloadURL);
  //   return {
  //     image_name: convertToSlug(name),
  //     url: downloadURL,
  //   };
  // }

  async uploadImage(file: any) {
    return new Promise((resolve, reject) => {
      // console.log(file);
      const { createReadStream, filename } = file;
      const storage = getStorage(firebase);
      const chunks = [];
      let totalBytes = 0;

      const type = file.mimetype.split('/')[1];

      const metadata: any = {};
      if (type == 'png') {
        metadata.contentType = 'image/png';
      }
      if (type == 'jpg') {
        metadata.contentType = 'image/jpg';
      }
      const readStream = createReadStream();

      readStream.on('data', (chunk) => {
        chunks.push(chunk);
        totalBytes += chunk.length;
      });

      readStream.on('end', async () => {
        const imageRef = ref(storage, filename);
        const buffer = Buffer.concat(chunks, totalBytes);
        // console.log(buffer);
        await uploadBytes(imageRef, buffer, metadata);
        const downloadURL = await getDownloadURL(imageRef);
        // console.log(downloadURL);
        resolve({
          image_name: convertToSlug(filename),
          url: downloadURL,
        });
      });

      readStream.on('error', (err) => {
        console.error(`Error reading ${filename}: ${err}`);
        reject('Error uploading file.');
      });
    });
  }
  async uploadImages(files: any) {
    let fileList = [];
    for (let i = 0; i < files.length; i++) {
      const file = await this.uploadImage(files[i]);
      fileList.push(file);
    }
    return fileList;
  }
}

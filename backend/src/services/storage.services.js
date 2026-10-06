import ImageKit from '@imagekit/nodejs';
import { config } from '../config/config.js';



const client = new ImageKit({
  privateKey: config.IMAGEKIT_API_KEY,
});


export default async function uploadFile({ buffer , fileName , folder = "SNITCH"}) {

const result = await client.files.upload({
  file: await ImageKit.toFile(buffer),
  fileName,
  folder,
});

return result.url;


}
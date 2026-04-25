const ImageKit = require("@imagekit/nodejs");

let ImageClient = null;

if (
  process.env.NODE_ENV !== "test" &&
  process.env.IMAGEKIT_PRIVATE_KEY
) {
  ImageClient = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
}

module.exports = ImageClient;
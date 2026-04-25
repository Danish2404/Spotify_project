const ImageKit = require("@imagekit/nodejs");

if (
  process.env.NODE_ENV === "test" ||
  !process.env.IMAGEKIT_PRIVATE_KEY
) {
  module.exports = {
    uploadFile: async () => ({
      url: "https://dummy-image-url.com/test.jpg",
      fileId: "dummy123",
    }),
    deleteFile: async () => true,
  };
} else {
  const ImageClient = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  module.exports = {
    uploadFile: async () => {
      return { url: "", fileId: "" };
    },
    deleteFile: async () => true,
    ImageClient,
  };
}
const {ImageKit}=require("@imagekit/nodejs")



const ImageClient=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
})


async function uploadFile(file){
    const result = await ImageClient.files.upload({
        file,
        fileName:"music-file"+Date.now(),
        folder:"spotify-music/music"

    })
    return result;
}

module.exports={uploadFile};
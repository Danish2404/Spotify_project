const express=require('express');
const musicController=require('../controllers/music.controller');
const multer=require('multer');

const router=express.Router();

const upload=multer({
    storage:multer.memoryStorage()
});


router.post('/upload',upload.single('music'),musicController.createMusic);

router.post('/album',musicController.createAlbum);

router.get('/', musicController.getAllMusic);









module.exports=router;
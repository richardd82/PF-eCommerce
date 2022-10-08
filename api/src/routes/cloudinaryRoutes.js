const { cloudinary } = require('./cloudinaryResource.js');
const express = require('express');
const router = express();
var cors = require('cors');

router.use(express.static('public'));
router.use(express.json({ limit: '10mb' }));
router.use(express.urlencoded({ limit: '10mb', extended: true }));
router.use(cors());

router.get('/images', async (_req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:dev_setups')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});
router.post('/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'zt3zbmga',
        });
        console.log(uploadResponse);
        res.json({ msg: 'youGetIt' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

// const port = process.env.PORT || 3001;
// router.listen(port, () => {
//     console.log('listening on 3001');
// });

module.exports = router;
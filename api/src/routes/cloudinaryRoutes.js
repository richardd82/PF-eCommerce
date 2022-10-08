const  cloudinary  = require('../source/cloudinarySource.js');
const express = require('express');
const router = express();
var cors = require('cors');


router.use(express.static('public'));
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> b712e80 (minor changes)
<<<<<<< HEAD
router.use(express.json({ limit: '10mb' }));
router.use(express.urlencoded({ limit: '10mb', extended: true }));
=======
>>>>>>> 634165a (Cambiando las configuraciones del server sequelize para que reciba bien el body pasado para el cloudinary)
<<<<<<< HEAD
>>>>>>> 3ef548c (Cambiando las configuraciones del server sequelize para que reciba bien el body pasado para el cloudinary)
=======
=======
router.use(express.json({ limit: '120mb' }));
router.use(express.urlencoded({ limit: '120mb', extended: true }));
>>>>>>> 3cf927a (minor changes)
>>>>>>> b712e80 (minor changes)
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
    const {file} = req.body;
    //console.log(file)
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
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

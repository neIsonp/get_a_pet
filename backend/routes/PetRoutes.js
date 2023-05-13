const router = require('express').Router();

const PetController = require('../controllers/PetController.js');

const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload.js');

router.post('/create', verifyToken, imageUpload.array('images'), PetController.create);
router.get('/', PetController.getAll);
router.get('/mypets', verifyToken, PetController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)

module.exports = router;
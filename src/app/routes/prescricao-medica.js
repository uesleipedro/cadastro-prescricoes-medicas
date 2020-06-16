const { Router } = require('express');
const router = Router();

const authMiddleware = require('../middlewares/auth');
router.use(authMiddleware);

const prescricaoController = require('../controller/prescricao-medica-controller'); 

router.get('/', prescricaoController.getPrescricao);
router.post('/', prescricaoController.postPrescricao);

module.exports = router;
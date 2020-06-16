const { Router } = require('express');
const router = Router();

const medicoController = require('../controller/medico-controller'); 

router.post('/', medicoController.postMedico);
router.post('/autenticacao/:email', medicoController.autenticacaoMedico);

module.exports = router;
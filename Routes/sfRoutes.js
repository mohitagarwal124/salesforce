const router = require('express').Router();
const controller = require('../Controller');

router.post('/login/auth', controller.sfController.login);
router.post('/login/direct', controller.sfController.directLogin);
router.get('/oauth2', controller.sfController.authorization);
router.post('/account/insert', controller.sfController.setAccount);
router.post('/account/update', controller.sfController.updateAccount);
router.get('/account/retrieve', controller.sfController.retrieveAccount);

module.exports = router;

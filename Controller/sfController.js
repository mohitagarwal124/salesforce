const response = require('../Lib/response');
const services = require('../Services');

async function login(req, res) {
    console.log('=======req.body===========', req.body);
    try {
        const url = await services.sfService.sfUrl();
        res.redirect(url);
      } catch (error) {
        response.sendError(error, res);
      }
}

async function directLogin(req, res) {
    console.log('=======req.body===========', req.body);
    try {
        const url = await services.sfService.sfLogin(req.body);
        response.sendSuccess({}, res);
      } catch (error) {
        response.sendError(error, res);
      }
}

async function authorization(req, res) {
    console.log('=======req.param===========', req.query);
    try {
        await services.sfService.sfAuthorization(req.query);
        response.sendSuccess({}, res);
      } catch (error) {
        response.sendError(error, res);
      }
}

async function setAccount(req, res) {
    console.log('=======req.body===========', req.body);
    try {
        const data = await services.sfService.setAccountData(req.body);
        response.sendSuccess(data, res);
      } catch (error) {
        response.sendError(error, res);
      }
}

async function updateAccount(req, res) {
    console.log('=======req.body===========', req.body);
    try {
        const data = await services.sfService.updateAccontData(req.body);
        response.sendSuccess(data, res);
      } catch (error) {
        response.sendError(error, res);
      }
}

async function retrieveAccount(req, res) {
    console.log("=======req.query========");
    try {
        const responseData = await services.sfService.retrieveAccountData();
        // console.log(responseData);
        response.sendSuccess(responseData, res);
      } catch (error) {
        response.sendError(error, res);
      }
}

module.exports = {
    login,
    directLogin,
    authorization,
    setAccount,
    retrieveAccount,
    updateAccount,
};
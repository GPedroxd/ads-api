const express = require('express');
const router = express.Router();

const Auth = require('./middlewares/AuthMiddleware');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdsController = require('./controllers/AdsController');
const AuthValidator = require('./validators/AuthValidator');
const UserValidator = require('./validators/UserValidator');
const AdValidador = require('./validators/AdValidator');

router.get('/states', UserController.getState);

router.post('/signin', AuthValidator.signin, AuthController.signin);
router.post('/signup', AuthValidator.signup, AuthController.signup);

router.get('/user/me', Auth.private, UserController.getInfo);
router.put('/user/me', Auth.private, UserValidator.editAction, UserController.editAction);

router.get('/categories', AdsController.getCategories);

router.post('/ad/add', Auth.private, AdValidador.add, AdsController.addAction);
router.get('/ad/list', AdsController.getList);
router.get('/ad/item', AdValidador.getItem, AdsController.getItem);
router.post('/ad/:id', Auth.private, AdsController.editAction);

module.exports = router
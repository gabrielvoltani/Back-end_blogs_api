const express = require('express');
const { controllerCategory } = require('../controllers/index');
const { categoryValidator } = require('../middlewares/categoryValidator');
const { verifyToken } = require('../auth/authoFunctions');

const router = express.Router();

router.post('/',
verifyToken,
categoryValidator,
controllerCategory.addCategory);

module.exports = router;
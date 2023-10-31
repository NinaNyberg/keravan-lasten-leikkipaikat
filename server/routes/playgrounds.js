const express = require('express');
const router = express.Router();
const { getPlaygrounds, addPlayground } = require('../controllers/playgrounds');

router.route('/').get(getPlaygrounds).post(addPlayground);
module.exports = router;

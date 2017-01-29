var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('Hello, you have requested a list or recipes');
});

module.exports = router;
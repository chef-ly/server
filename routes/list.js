var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


router.get('/', function(req, res) {
     //return the list of recipes
     res.send(returnList());
     res.end();
});

function returnList(){
     var listPath = path.join(__dirname, '..', 'recipes', 'recipelist.json');
     var listJson = fs.readFileSync(listPath, 'utf8');
     var data = JSON.parse(listJson);
     return data;
}



module.exports = router;
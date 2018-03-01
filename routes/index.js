var express = require('express');
var router = express.Router();
var getNews = require('../module/getNewArticle');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getNews',function(req,res){
  getNews(function (rel) {
      if(rel){
          res.send(rel);
      }
  });
});
module.exports = router;

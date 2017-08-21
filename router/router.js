var express = require('express')
var router = express.Router()
var app = express();
// var worCloud = require('wordcloud');
var tagCloud = require('tag-cloud');
var fs = require("fs");


router.get('/',function(req, res, next) {
  console.log('get /');
  res.redirect('/test')
});


router.get('/test',function(req, res, next) {
  console.log('get /test/index.ejs');
  res.render('index');
});


var check = 1
var vec_list = [];


router.post('/get_word2vec', function (req, res, next) {
  console.log('post /get_word2vec');
  vec_list = [];
  var univ = req.body['univ']
  var keyword = req.body['keyword']

  var spawn = require('child_process').spawn;
  var prc = spawn('java',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'web_vector.jar', univ, keyword]);

  prc.stdout.setEncoding('utf8');
  prc.stdout.on('data', function (data) {
      var str = data.toString()
      var lines = str.split(/(\r?\n)/g);
      console.log(lines.join(""));
  });

  prc.on('close', function (code) {
      console.log('process exit code ' + code);
      var f_dir = 'vector.txt'
      var file_data = fs.readFileSync(f_dir);
      vec_list.push(file_data.toString())
      res.send(vec_list)
  });


});


router.post('/get_keyword', function (req, res, next) {
  console.log('post /get_keyword');
    _list = [];
    var univ = req.body['univ']

    var spawn = require('child_process').spawn;
    var prc = spawn('java',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'web_keyword.jar', univ]);

    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', function (data) {
        var str = data.toString()
        var lines = str.split(/(\r?\n)/g);
        console.log(lines.join(""));
    });

    prc.on('close', function (code) {
        console.log('process exit code ' + code);
        var f_dir = univ+'_keyword_set.txt'
        var file_data = fs.readFileSync(f_dir);
        _list.push(file_data.toString())
        res.send(_list)
    });


});

app.use(function(err, req, res, next) {
  console.log("error check");
  console.log(err);
})

module.exports = router

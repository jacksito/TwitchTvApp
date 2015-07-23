var express = require('express');
var router = express.Router();
var rest_twitch = require('./rest_requests')

/* GET home page. */
router.get('/', function(req, res, next) {
  var call = {msg : 'top'};
  rest_twitch.twitch_rest_call(call, function(data){
    req.session.next = data.next;
    res.render('index', { title: 'Twitch' , data: data.data});
  });
});

router.get('/game/:gameId', function(req, res) {
  var call = {msg : 'streams_by_game', game: req.params.gameId};
  rest_twitch.twitch_rest_call(call , function(data){
    req.session.next = data.next;
    res.render('game', { title: req.params.gameId , data: data.data});
  });
});

router.get('/streamer/:streamerId', function(req, res) {
  var call = {msg : 'streamer', channel: req.params.streamerId};
  rest_twitch.twitch_rest_call(call , function(data){
    res.render('streamer', { title: req.params.streamerId , data: data.data});
  });
});

router.get('/more-games', function(req, res) {
  var call = {msg : 'more-games', call: req.session.next};
  rest_twitch.twitch_rest_call(call , function(data){
    req.session.next = data.next;
    res.send(data.data);
  });
});

router.get('/more-streamers', function(req, res) {
  var call = {msg : 'more-streamers', call: req.session.next};
  console.log(req.session.next);
  rest_twitch.twitch_rest_call(call , function(data){
    req.session.next = data.next;
    res.send(data.data);
  });
});

module.exports = router;

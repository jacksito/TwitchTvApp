/**
 * Created by Jack on 06/07/2015.
 */

var Client = require('node-rest-client').Client;

client = new Client();

client.registerMethod("root", "https://api.twitch.tv/kraken", "GET");

client.registerMethod("top", "https://api.twitch.tv/kraken/games/top", "GET");

client.registerMethod("streams_by_game", "https://api.twitch.tv/kraken/search/streams?q=${game}","GET");



exports.twitch_rest_call = function(call, callback){
    switch (call.msg){
        case 'top':
            client.methods.top(function(data,response){
                var jsonobject = JSON.parse(data);
                callback({data :jsonobject.top, next : jsonobject._links.next});
            });
            break;
        case 'root':
            client.methods.root(function(data,response){
                var jsonobject = JSON.parse(data);
                callback({data :jsonobject._links});
            });
            break;
        case 'streams_by_game':
            client.get("https://api.twitch.tv/kraken/streams?game="+call.game, function(data,response){
                var jsonobject = JSON.parse(data);
                callback({data :jsonobject.streams, next : jsonobject._links.next});
            });
            break;

        case 'streamer':
            client.get("https://api.twitch.tv/kraken/channels/"+call.channel, function(data,response){
                callback({data :JSON.parse(data)});
            });
            break;
        case 'more-games':
            client.get(call.call, function(data,response) {
                var jsonobject = JSON.parse(data);
                callback({data: jsonobject.top, next: jsonobject._links.next});
            });
            break;
        case 'more-streamers':
            client.get(call.call, function(data,response) {
                var jsonobject = JSON.parse(data);
                callback({data: jsonobject.streams, next: jsonobject._links.next});
            });
            break;
        default :
            callback(none);
    }

}

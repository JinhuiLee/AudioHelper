var https = require('https');
var tmpl = require("tmpl");
var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var rp = require('request-promise');
var promise = require('promise');
var co = require('co');
//var xmlBodyParser = require('express-xml-parser');


function getAudio( text , token)
{
  if (token=="") return;
  //console.log("pos1");

  var options = {
    method:'POST',
    uri: 'http://tsn.baidu.com/text2audio',
    form:{
    tex: text,
    lan: "zh",
    tok: token,
    ctp: 1,
    cuid:"10086"
  },
    headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    ,encoding : null
  };

  //console.log(options);
  rp(options)
    .then(function (parsedBody) {
        // POST succeeded...
        console.log(parsedBody);

        file="./2.mp3"
        foptions = { encoding: 'binary', mode: 438 /*=0666*/, flag: 'w' };
        fs.writeFileSync(file, parsedBody,foptions);
        console.log("文字转语音成功");
    })
    .catch(function (err) {
        // POST failed...
        console.log("文字转语音失败");
    });
  //console.log("pos3");
}




function getToken()
{


  url="https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id={APIKEY}&client_secret={SECRETKEY}&";
  APPID="8164564";
  APIKEY="jx4SoVA6QZ46P45Qlslv3QLF";
  SECRETKEY="5803e729ec39fa8bb7f2332be0127be1";
  url=tmpl(url,{
    APIKEY:APIKEY,
    SECRETKEY:SECRETKEY
  });

  var options = {
    method:'GET',
    uri: url,
    json:true
  };
  //console.log(options);
  rp(options)
    .then(function (repos) {
        //console.log('User has %d repos', repos.length);
        console.log("语音API Token获取成功");
        console.log(repos.access_token);
        token=repos.access_token;
        //setTimeout(getToken,7200*1000);
        return token;
    })
    .catch(function (err) {
        // API call failed...
        console.log("语音API Token获取失败");
    });
}

var text = "测试，微信公众号";
 textToSpeech(text);

var co = require('co');





// co(function *(){
//     var now = Date.now();
//     yield sleep(500);
//     console.log(Date.now() - now);
// });

function sleep(ms){
    return function(cb){
        setTimeout(cb, ms);
    };
}




function textToSpeech( text )
{
  co(function *( text ){
     console.log("start")
     return  getToken( text );

  }).then(function()
  {
    console.log("fff");
    getAudio(text , token);
  });

}

module.export= textToSpeech;

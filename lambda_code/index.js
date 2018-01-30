//Lambda Function I am using

var crypto = require('crypto');
const https = require('https');
const googleRecapchaSecret = "[GOOGLE RECAPTCHA SECRET]";
/* 
  Sample response query string
  https://www.google.com/recaptcha/api/siteverify?secret=your_secret&response=response_string
*/
function validateRecaptcha(recaptchaResponse, event, callback){
    var querystring = require('querystring');    
    var postData = querystring.stringify({secret : googleRecapchaSecret,response : recaptchaResponse});
    var options = {
       hostname: 'www.google.com',
       path: '/recaptcha/api/siteverify',
       method: 'POST',
       port: 443, 
       headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
        }
      
    };   
  
   var req = https.request(options, (res) => {
        res.on('data', (d) => {
             if (d === undefined){ callback(null, {result : 'undefined'}); return}
             
             var response = JSON.parse(d);
             console.log(response);
             if(response.success === true){
                 checkNewMember(event, callback);
             }else{
                 callback(null, response);
             }
        });
   });  
  
   req.write(postData);
   req.end();
   
   req.on('error', (e) => {
       //console.log(e);
       callback(null, {result : 'false'});
   });
   
}

function checkNewMember(event, callback) {
     if(event.email === undefined) { 
        callback(null, {result:"error", msg: "email is empty"}); 
    return; }
    
    if(event.name === undefined) { 
        callback(null, {result:"error", msg: "name is empty"}); 
    return; }

    /* Now you've got e-mail and name !*/    

    callback(null, {resulet:"success"});
}

exports.handler = (event, context, callback) => {
    if(event.captchaResponse === undefined) { context.fail('Must provide parameters!'); return; }
    console.log('Received Event:',event.captchaResponse);
    
    var recaptchaResponse = event.captchaResponse;

    validateRecaptcha(recaptchaResponse, event, callback);
};

/** Sync */
function randomString(length, chars) {
  if (!chars) {
    throw new Error('Argument \'chars\' is undefined');
  }

  var charsLength = chars.length;
  if (charsLength > 256) {
    throw new Error('Argument \'chars\' should not have more than 256 characters'
      + ', otherwise unpredictability will be broken');
  }

  var randomBytes = crypto.randomBytes(length);
  var result = new Array(length);

  var cursor = 0;
  for (var i = 0; i < length; i++) {
    cursor += randomBytes[i];
    result[i] = chars[cursor % charsLength];
  }

  return result.join('');
}

/** Sync */
function randomAsciiString(length) {
  return randomString(length,
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
}



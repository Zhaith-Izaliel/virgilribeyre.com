//Modules
const Express = require('express');
const Pug = require('pug');
const Nodemailer = require('nodemailer');
const Path = require('path');
const BodyParser = require('body-parser');
const Validator = require('validator');
const Config = require('./config');

//i18n
const IndexFr = require("./i18n/index_fr");
const IndexEn = require("./i18n/index_en");
const Er404Fr = require("./i18n/404_fr");
const Er404En = require("./i18n/404_en");
const CaptchaFr = require ("./i18n/captcha_fr");
const CaptchaEn = require ("./i18n/captcha_en");

//Captcha number range
const min = 0;
const max = 20;
const captchaType = ['sum','sub','prod'];

//Captcha Values
let int1;
let int2;
let type;

//Async function to send mail.
async function sendMailFromForm(first, last, email, message) {

  // create reusable transporter object using the default SMTP transport
  let transporter = Nodemailer.createTransport({
    host: Config.emailHost,
    port: Config.emailPort,
    secure: Config.emailPort === 465, // true for 465, false for other ports
    auth: {
      user: Config.emailTransporter,
      pass: Config.emailPassword
    }
  });
  let mailOptions = {
      from: Config.emailTransporter,
      to: Config.emailReceiver,
      replyTo: email,
      subject: first + " " + last + ", demande de contact depuis virgilribeyre.com.",
      text: message
  }
  await transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
//solve captcha
function captchaSolve(type, int1, int2) {
  switch (type) {
    case 'sum':
      return int1+int2;
    case 'sub':
      return int1-int2;
    case 'prod':
    default:
      return int1*int2;
  }
}

const app = Express(); //using express
app.set('views','./views'); //setting views directory
app.set('view engine','pug'); //using pug as template engine
app.use(Express.static(Path.join(__dirname, "/public")));

const jsonParser = BodyParser.json();

//render index by default.
app.get('/', function(req, res) {
  const lang = req.acceptsLanguages("fr", "en") || 'en';
  res.redirect(`/index/${lang}`);
});

//render page by language
app.get('/index/:lang', function(req, res) {
  const { lang = 'en' } = req.params;
  int1 = parseInt((Math.random() * (max - min + 1)), 10) + min;
  int2 = parseInt((Math.random() * (max - min + 1)), 10) + min;
  type = captchaType[Math.floor(Math.random()*captchaType.length)];
  switch(lang) {
    case "fr":
      return res.render('index',
      {
        i18n: IndexFr,
        currentLang: 'fr',
        captcha: {
          op: CaptchaFr.operation[type],
          int1,
          int2,
          and: CaptchaFr.and,
          equal: CaptchaFr.equal
        }
      });
    default:
      return res.render('index', {
        i18n: IndexEn,
        currentLang: 'en',
        captcha: {
          op: CaptchaEn.operation[type],
          int1,
          int2,
          and: CaptchaEn.and,
          equal: CaptchaEn.equal
        }
      });
  }
});

//validate form on the fly
app.post('/validate', jsonParser, function (req, res) {
  const {body} = req;
  const validationErrors = ['first', 'last', 'message', 'email'].reduce((obj, key) => {
    if(key === 'email') {
      obj[key] = Validator.isEmail(body[key] || '');
    } else {
      obj[key] = !Validator.isEmpty(body[key] || '');
    }
    return obj;
  }, {});
  res.json({validationErrors});
});

//post form
app.post('/form', jsonParser, function(req, res){
  const {body} = req;
  const sendErrors = ['first', 'last', 'message', 'email', 'captcha'].reduce((obj, key) => {
    if(key === 'email') {
      obj[key] = Validator.isEmail(body[key] || '');
    } else if(key === 'captcha'){
      const validCaptcha = captchaSolve(type,int1,int2);
      obj[key] = validCaptcha === parseInt(body[key],10);
    } else {
      obj[key] = !Validator.isEmpty(body[key] || '');
    }
    return obj;
  }, {});
  res.json({sendErrors});
  var isGood = Object.keys(sendErrors).every(function(key){
    return sendErrors[key] === true;
  });
  if(isGood) {
    sendMailFromForm(body.first,body.last,body.email,body.message).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.error(err);
    })
  }
});

//handle 404 error
app.get('/404/:lang', function(req, res){
  const { lang = 'en' } = req.params;

  switch (lang) {
    case "fr":
    return res.render('404', {i18n: Er404Fr, currentLang: 'fr'});
    default:
    return res.render('404', {i18n: Er404En, currentLang: 'en'});
  }
});
app.get('*', function(req, res) {
  const lang = req.acceptsLanguages("fr", "en") || 'en';
  res.redirect(`/404/${lang}`);
});


app.listen(Config.port, function(){
  console.log('Server running on'+Config.port+'. Press CTRL+C to end the server.');
});

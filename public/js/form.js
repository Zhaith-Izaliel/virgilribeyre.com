

function validation(name, value) {
  var body = {};
  body[name] = value;
  return rxjs.ajax.ajax({url: '/validate', method: 'POST', body: body, headers: {
    "Content-Type": "application/json"
  }});
}

function validationAll(allValues) {
  var body = allValues;
  return rxjs.ajax.ajax({url: '/form', method: 'POST', body: body, headers: {
    "Content-Type": "application/json"
  }});
}

function decorateInvalid(id, response) {
  if(!response) {
    if(id==="message") {
      $("#"+id+"Invalid").removeClass("invisible");
      $("#"+id).removeClass("form-message form-message-invalid")
      $("#"+id).addClass("form-message-invalid");
    } else {
      $("#"+id+"Invalid").removeClass("invisible");
      $("#"+id).removeClass("form-field form-field-invalid")
      $("#"+id).addClass("form-field-invalid");
    }
  } else {
    if(id==="message") {
      $("#"+id+"Invalid").addClass("invisible");
      $("#"+id).removeClass("form-message form-message-invalid")
      $("#"+id).addClass("form-message");
    } else {
      $("#"+id+"Invalid").addClass("invisible");
      $("#"+id).removeClass("form-field form-field-invalid")
      $("#"+id).addClass("form-field");
    }
  }
}

function addFocusout(id) {
  $("#"+id).focusout(function(){
    var val=$("#"+id).val();
    validation(id, val).subscribe(function(request) {
      var response = request.response.validationErrors;
      decorateInvalid(id,response[id]);
    });
  });
}

addFocusout('first');
addFocusout('last');
addFocusout('email');
addFocusout('message');

function sendRequest() {
  validationAll(
    {
      first: $("#first").val(),
      last: $("#last").val(),
      email: $("#email").val(),
      message: $("#message").val(),
      captcha: $("#captcha").val()
    }
  ).subscribe(function(request){
    var response = request.response.sendErrors;
    decorateInvalid("first",response["first"]);
    decorateInvalid("last",response["last"]);
    decorateInvalid("email",response["email"]);
    decorateInvalid("message",response["message"]);
    decorateInvalid("captcha",response["captcha"]);
    var isGood = Object.keys(response).every(function(key){
      return response[key] === true;
    });
    if(isGood) {
      $("#info-message").removeClass("invisible");
    }
  });
}

$("#submit-button").click(function(e){
  e.preventDefault();
  sendRequest();
});

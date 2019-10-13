//Display to-top-button
$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    $("#to-top-button").fadeIn('slow');
  } else {
    $("#to-top-button").fadeOut('slow');
  }
});

//Scroll to top Button
function toTop() {
  var body = $("body, html");
  var top = body.scrollTop() // Get position of the body
  if(top!=0)
  {
    body.animate({scrollTop :0}, 700);
  }
}

$(document).ready(function() {
  $("#to-top-button").hover(
    function(){
      $("#inner-to-top-button").slideUp(800, "swing");
      $("#inner-to-top-button").slideDown(800, "swing");
    },function(){});
  $("#to-top-button").click(function() {
    toTop();
  })
});

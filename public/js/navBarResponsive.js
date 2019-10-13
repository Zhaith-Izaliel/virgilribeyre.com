// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
  var $elt = $('#navDemo');
  var duration = 'slow';
  $elt.slideToggle(duration);
}

$(document).ready(function() {
  $(".button-responsive-function").click(function(){
    toggleFunction();
  });
});

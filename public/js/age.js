//Age Calculation
function calculateAge(birthday) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function displayAge() {
  var birthday = new Date(99, 11, 18);
  var age = calculateAge(birthday);
  $(".dynamic-age").html(age);
}

$(document).ready(function() {
  displayAge();
});

function scrollToID(id) {
  $('html, body').animate({
    scrollTop: $(id).offset().top
  }, 700);
}

// Change style of navbar on scroll
window.onscroll = function() {
  var navbar = $("#myNavbar");
  if ($(window).scrollTop() > 400) {
    navbar.removeClass("opacity-75");
  } else {
    navbar.addClass("opacity-75");
  }
};


$(document).ready(function() {
  $(".home-button").click(function(){scrollToID("#home")});
  $(".about-button").click(function(){scrollToID("#about")});
  $(".portfolio-button").click(function(){scrollToID("#portfolio")});
  $(".studies-button").click(function(){scrollToID("#studies")});
  $(".skills-button").click(function(){scrollToID("#skills")});
  $(".experiences-button").click(function(){scrollToID("#experiences")});
  $(".contact-button").click(function(){scrollToID("#contact")});
});

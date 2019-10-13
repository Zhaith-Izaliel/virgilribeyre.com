function openModal(modal) {
  $(".modal-background").removeClass("hidden");
  modal.addClass("animated fadeInUp");
}

function closeModal(modal) {
  modal.removeClass("animated fadeInUp");
  $(".modal-background").addClass("hidden");
}

$(document).ready(function() {
  $('.close-modal').click(function(){
    closeModal($('#modal-skills'));
  });

  $('#open-modal').click(function(){
    openModal($('#modal-skills'));
  });
});

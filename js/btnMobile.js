$(function() {
    $(".toggle").on("click", function() {
        if ($(".menu__item").hasClass("active")) {
            $(".menu__item").removeClass("active");
        } else {
            $(".menu__item").addClass("active");
        }
    });
  });
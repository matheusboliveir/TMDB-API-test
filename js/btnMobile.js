// menu mobile
$(function() {
    $(".toggle").on("click", function() {
        if ($(".menuLayer").hasClass("active")) {
            $(".menuLayer").removeClass("active");
        } else {
            $(".menuLayer").addClass("active");
        }
    });
  });
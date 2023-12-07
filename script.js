// Document ready
$(function() {

    // Banner
  
    // Animate the banner image
    var bannerImage = $("#banner-image");
    bannerImage.css("background-image", "url(assets/img/yan-holtz.jpg)");
    bannerImage.animate({
      width: "100%",
      height: "100%",
    }, 1000);
  
    // Add a smooth scroll to the banner
    $("#banner").on("click", function() {
      $("html, body").animate({
        scrollTop: $("#about").offset().top,
      }, 1000);
    });
  
    // About section
  
    // Add a smooth scroll to the about section
    $("#about").on("click", function() {
      $("html, body").animate({
        scrollTop: $("#about").offset().top,
      }, 1000);
    });
  
    // Projects section
  
    // Add a smooth scroll to the projects section
    $("#projects").on("click", function() {
      $("html, body").animate({
        scrollTop: $("#projects").offset().top,
      }, 1000);
    });
  
    // Contact section
  
    // Add a smooth scroll to the contact section
    $("#contact").on("click", function() {
      $("html, body").animate({
        scrollTop: $("#contact").offset().top,
      }, 1000);
    });
  
  });
  
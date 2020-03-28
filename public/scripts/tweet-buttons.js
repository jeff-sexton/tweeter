/*eslint-env jquery*/
/* global document */
/* global window */

$(document).ready(()=> {
  $('.navbar .nav-new-button').click(() => {
    $('.new-tweet').slideToggle('medium');
    $('.new-tweet #tweet-text').focus();
  });
  
  $(window).scroll(() => {
    const windowTop = $(window).scrollTop();
    const mainContainerTop = $('.container').offset().top;

    $('.navbar .logo').toggleClass('outline', windowTop > mainContainerTop - 120);
    $('.navbar .nav-new-button').toggleClass('hide', windowTop > mainContainerTop - 120);
    $('.bottom-new-button').toggleClass('hide', windowTop < mainContainerTop - 119);
  });
  
  $('.bottom-new-button').click(() => {
    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').slideToggle('medium');
    }
    
    $(window).scrollTop($('.container').offset().top - 120);
    $('.new-tweet #tweet-text').focus();
    $(window).scroll();
  });
});
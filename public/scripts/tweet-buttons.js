/*eslint-env jquery*/
/* global document */
/* global window */

$(document).ready(()=> {

  $('.navbar .nav-new-button').click(() => {
    $('.new-tweet').slideToggle('medium');
    $('.new-tweet #tweet-text').focus();
  }
  );
  
  $(window).scroll(() => {
    const windowTop = $(window).scrollTop();
    const mainContainerTop = $('.container').offset().top;

    $('.navbar .nav-new-button').toggleClass('hide', windowTop > mainContainerTop - 120);
    $('.navbar .logo').toggleClass('outline', windowTop > mainContainerTop - 120);
    $('.bottom-new-button').toggleClass('hide', windowTop < mainContainerTop - 120);
  });
  
  $('.bottom-new-button').click(() => {
    console.log($('.new-tweet').css('display'));
    
    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').slideToggle('medium');
    }
    
    $(window).scrollTop($('.container').offset().top);
    $('.new-tweet #tweet-text').focus();
    $(window).scroll();
  });
});
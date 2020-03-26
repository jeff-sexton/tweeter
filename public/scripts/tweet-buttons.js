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
    const tweetDisplayTop = $('.tweet-display').offset().top;
    $('.navbar .nav-new-button').toggleClass('hide', windowTop > tweetDisplayTop - 100);
    $('.bottom-new-button').toggleClass('hide', windowTop < tweetDisplayTop - 100);
  });
  
  $('.bottom-new-button').click(() => {
    console.log($('.new-tweet').css('display'));
    
    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').slideToggle('medium');
    }
    
    $(window).scrollTop($('.new-tweet').offset().top - 150);
    $('.new-tweet #tweet-text').focus();
    $(window).scroll();
  });
});
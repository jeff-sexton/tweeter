/*eslint-env jquery*/
/* global document */
/* global window */

$(document).ready(()=> {

  // Handle New Tweet Button
  $('.navbar .nav-new-button').click(() => {
    $('.new-tweet').slideToggle('medium');
    $('.new-tweet #tweet-text').focus();
  }
  );
  
  // Handle Page Scroll to switch button display
  $(window).scroll(() => {
    const windowTop = $(window).scrollTop();
    const tweetDisplayTop = $('.tweet-display').offset().top;
    
    $('.navbar .nav-new-button').toggleClass('hide', windowTop > tweetDisplayTop - 100);
    $('.bottom-new-button').toggleClass('hide', windowTop < tweetDisplayTop - 100);
  });
  
  // Handle New Tweet Button
  $('.bottom-new-button').click(() => {
    $('.new-tweet').slideToggle('medium');
    $('.new-tweet #tweet-text').focus();
    $(window).scrollTop($('.tweet-display').offset().top - 100);
    $(window).scroll();
  }
  );

});
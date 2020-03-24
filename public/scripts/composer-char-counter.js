$(document).ready(() => {
 
  $('.new-tweet #tweet-text').keyup(function() {
    /* Calculate characters left from max of 140 */
    let charLeft = 140 - $(this).val().length;

    /* Update Couter Value */
    let counter = $(this).next('footer').children('.counter');
    counter.val(charLeft);

    /* Toggle .red class when too many characters present */
    $(counter).toggleClass('red', charLeft < 0);

  });


});
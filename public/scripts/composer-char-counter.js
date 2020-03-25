$(document).ready(() => {
 
  $('.new-tweet #tweet-text').on('input', function() {
    /* Calculate characters left from max of 140 */
    let charLeft = 140 - $(this).val().length;

    /* Update Couter Value */
    $(this).next('footer').children('.counter').val(charLeft);

    /* Toggle .red class when too many characters present */
    $($counter).toggleClass('red', charLeft < 0);

  });


});
/*eslint-env jquery*/
/* global document */

$(document).ready(() => {
     
  $('.new-tweet #tweet-text').on('input', function() {
    let charLeft = 140 - $(this).val().length;

    let $counter = $(this).next('.new-tweet-footer').children('.counter');
    $counter.val(charLeft);

    $($counter).toggleClass('red', charLeft < 0);
  });


});
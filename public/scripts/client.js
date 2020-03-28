/*eslint-env jquery*/
/* global document */

const getTweetAge = (createdMillis) => {
  let unit = 'day';
  let age = (Date.now() - createdMillis) / 86400000; /* milliseconds in a day */

  if (age >= 365) {
    age = age / 365;
    unit = 'year';
  } else if (age > 28) {
    age = age / 28;
    unit = 'month';
  }

  age = Math.floor(age);
 
  if (age !== 1) {
    unit += 's';
  }

  return `${age} ${unit} ago`;
};

const createTweetElement = (tweetObj) => {

  const $article = $('<article>').addClass('tweet');

  const $header = $('<header>').addClass('tweet-header').append(
    $('<span>').addClass('left').append(
      $('<img>').attr('src', tweetObj.user.avatars),
      $('<span>').text(tweetObj.user.name)
    ),
    $('<span>').addClass('right').text(tweetObj.user.handle)
  );

  const $content = $('<p>').text(tweetObj.content.text);

  const $footer = $('<footer>').addClass('tweet-footer').append(
    $('<span>').addClass('left').text(getTweetAge(tweetObj.created_at)),
    $('<span>').addClass('right').html('<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>')
  );
  
  return $($article).append($header, $content, $footer);
};

const renderOneTweet = (tweet) => {
  const $newTweet = createTweetElement(tweet);
  $('.tweet-display').append($newTweet);
};

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    renderOneTweet(tweet);
  }
};

const showError = (errorString) => {
  const $error = $('.error');
  
  if (errorString) {
    $('.new-tweet').slideDown('medium');
  
    $error.slideDown('medium');
    $error.children('.error-text').text(errorString);
  } else {
    $error.slideUp('medium');
  }
};

const loadTweets = () => {
  $.getJSON('/tweets')
    .then((tweets) => {
      renderTweets(tweets);
    })
    .catch(error => {
      showError(`Status Code: ${error.status} - Message: ${error.statusText}`);
    });
};

const submitTweet = function(event) {
  event.preventDefault();

  const $tweetText = $(this).children('#tweet-text');
  const tweetText = $($tweetText).val();

  showError();

  if (tweetText === null || tweetText === '') {
    showError('Please enter some text in the field below.');
  } else if (tweetText.length > 140) {
    showError('Your Tweet is too long. Please shorten to 140 characters or less.');
  } else {
    // submit tweet
    $.post('/tweets', $(this).serialize())
      .then((res) => {
        renderOneTweet(res.tweet); // Needed to refactor routes/tweets.js to get this to work.
      })
      .catch(error => {
        showError(`Status Code: ${error.status} - Message: ${error.statusText}`);
      });
      
    // clear text box - happens synchronously after the ajax POST is started
    $($tweetText).val('');
    $($tweetText).trigger('input');
  }
};

$(document).ready(()=> {

  loadTweets();

  // Handle new Tweet Submission
  $('.new-tweet form').submit(submitTweet);
});


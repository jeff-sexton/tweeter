/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

const escape = (string) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
};

const createTweetElement = (tweetObj) => {
  return $('<article>').addClass('tweet').html(
    `<div class='tweet-header'>
      <span class='left'><img src=${tweetObj.user.avatars}><span>${escape(tweetObj.user.name)}</span></span> 
      <span class='right'>${escape(tweetObj.user.handle)}</span>
    </div>
    
    <div>
      <p>${escape(tweetObj.content.text)}</p>
    </div>

    <div class='tweet-footer'>
      <span class='left'>${getTweetAge(tweetObj.created_at)}</span>
      <span class='right'><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
    </div>`
  );

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

const loadTweets = () => {
  $.ajax('/tweets', {method: 'GET'})
    .then((tweets) => {
      renderTweets(tweets);
    });
};

// Execute when document is ready
$(document).ready(()=> {

  //Load existing tweets
  loadTweets();

  // Handle new Tweet Submission
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    
    const tweetText = $(this).children('#tweet-text').val();
    const $error = $(this).prev('.error');

    $error.slideUp('medium'); // Hide error if already showing

    if (tweetText === null || tweetText === '') {
      $error.children('.error-text').text('Please enter some text in the field below.');
      $error.slideDown('medium');
      
    } else if (tweetText.length > 140) {
      $error.children('.error-text').text('Your Tweet is too long. Please shorten to 140 characters or less.');
      $error.slideDown('medium');

    } else {
      // submit tweet
      $.ajax('/tweets', {
        method: 'POST',
        data: $(this).serialize(),
      })
        .then((res) => {
          renderOneTweet(res.tweet); // Needed to refactor routes/tweets.js to get this to work.
        });
        
      // clear text box - happens synchronously after the ajax POST is started
      $(this).children('#tweet-text').val('');
    }
  });

});


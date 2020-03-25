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

  if (age >= 2) {
    unit += 's';
  }

  return `${Math.floor(age)} ${unit} ago`;
};

const createTweetElement = (tweetObj) => {
  return $('<article>').addClass('tweet').html(
    `<div class='tweet-header'>
      <span class='left'><img src=${tweetObj.user.avatars}><span>${tweetObj.user.name}</span></span> 
      <span class='right'>${tweetObj.user.handle}</span>
    </div>
    
    <div>
      <p>${tweetObj.content.text}</p>
    </div>

    <div class='tweet-footer'>
      <span class='left'>${getTweetAge(tweetObj.created_at)}</span>
      <span class='right'><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
    </div>`
  );

};

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const $newTweet = createTweetElement(tweet);
    $('.tweet-display').append($newTweet);
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
  const $newTweetForm = $('.new-tweet form');

  $newTweetForm.submit((event) => {
    event.preventDefault();

    $.ajax('/tweets', {
      method: 'POST',
      data: $newTweetForm.serialize(),
    });
  });

});


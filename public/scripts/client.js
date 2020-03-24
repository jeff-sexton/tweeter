/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


$(document).ready(()=> {
  renderTweets(data);
});

const createTweetElement = (tweetObj) => {
  return $('<article>').addClass('tweet').html(
    `<header>
      <span class='left'><img src=${tweetObj.user.avatars}><span>${tweetObj.user.name}</span></span> 
      <span class='right'>${tweetObj.user.handle}</span>
    </header>
    
    <div>
      <p>${tweetObj.content.text}</p>
    </div>

    <footer>
      <span class='left'>${getTweetAge(tweetObj.created_at)}</span>
      <span class='right'><img src='/images/flag-variant.svg'><img src='/images/twitter-retweet.svg'><img src='/images/heart.svg'></span>
    </footer>`
  );

};

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const $newTweet = createTweetElement(tweet);
    $('.tweet-display').append($newTweet);
  }

};

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




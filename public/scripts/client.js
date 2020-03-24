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
  const $newTweet = $('<article>').addClass('tweet');
  
  $newTweet.html(
    `<header>
      <span class='left'><img src=${tweetObj.user.avatars}><span>${tweetObj.user.name}</span></span> 
      <span class='right'>${tweetObj.user.handle}</span>
    </header>
    
    <div>
      <p>${tweetObj.content.text}</p>
    </div>

    <footer>
      <span class='left'>${tweetObj.created_at} days ago</span>
      <span class='right'><img src='/images/flag-variant.svg'><img src='/images/twitter-retweet.svg'><img src='/images/heart.svg'></span>
    </footer>`
  );

  return $newTweet;

};

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const $newTweet = createTweetElement(tweet);
    $('.tweet-display').append($newTweet);
  }

};





/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const exampleTweet =  {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

$(document).ready(()=> {

  const $tweet = createTweetElement(exampleTweet);
  
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('.tweet-display').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});


const createTweetElement = function(tweetObj) {
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
      <span class='right'>logos</span>
    </footer>`
  );

  return $newTweet;

};





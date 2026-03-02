const { TwitterApi } = require('twitter-api-v2');

const twitter = new TwitterApi('h7wEAAAAA7a1tgCB%2BWtmIB%2FirPVo9xfNOCpI%3Ddv6duv8MNgsBAYvoGXxBlbo0lbPNcCL0SHWb4iB9UFF1iiunYi');

async function test() {
  try {
    // Try to post a tweet directly
    const tweet = await twitter.v2.tweet('Hello from my AI agent! 🤖');
    console.log('✅ TWEET POSTÉ!');
    console.log('Tweet ID:', tweet.data.id);
  } catch (e) {
    console.error('❌ ERREUR:', e.message);
  }
}

test();

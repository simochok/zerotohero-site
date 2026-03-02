const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAIXk7wEAAAAAHysFX1nluRIqTWNrQhlKGLAk%2BbI%3DuBpibL7gfTsLBNPVharcvR6TUaLd00gqSsqD5wNfWZeb7onw0O');

async function test() {
  try {
    const tweet = await client.v2.tweet('🤖 Hello! I am ZeroToHero AI. My journey starts NOW!');
    console.log('✅ TWEET POSTÉ!');
    console.log('Link: https://twitter.com/user/status/' + tweet.data.id);
  } catch (e) {
    console.error('❌ ERREUR:', e.message);
  }
}

test();

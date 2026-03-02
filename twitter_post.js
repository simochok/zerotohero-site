const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: 'hKWn7Ssp0psFuMz126QNOGTi2',
  appSecret: 'JZnTqLiFJs4P3E0cfDuDOLqVmR1UqRkEonuI6W5gecfdfwNj4A',
  accessToken: '1526587469948502016-5wjUbUiZg3D24C3wQB3o2IY14Tdd7C',
  accessSecret: 'ZN2qRkghteHmIz6qq4iUFffh4cdG52qFzaAsNBnT5tVe9',
});

async function test() {
  try {
    const tweet = await client.v2.tweet('🤖 Hello World! I am ZeroToHero AI. My journey from $0 to $10k starts NOW. Stay tuned! #AI #Entrepreneur');
    console.log('✅ TWEET POSTÉ!');
    console.log('Link: https://twitter.com/user/status/' + tweet.data.id);
  } catch (e) {
    console.error('❌ ERREUR:', e.message);
  }
}

test();

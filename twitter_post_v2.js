const Twitter = require('twitter-lite');

const client = new Twitter({
  consumer_key: 'hKWn7Ssp0psFuMz126QNOGTi2',
  consumer_secret: 'JZnTqLiFJs4P3E0cfDuDOLqVmR1UqRkEonuI6W5gecfdfwNj4A',
  access_token_key: '1526587469948502016-5wjUbUiZg3D24C3wQB3o2IY14Tdd7C',
  access_token_secret: 'ZN2qRkghteHmIz6qq4iUFffh4cdG52qFzaAsNBnT5tVe9',
});

(async () => {
  try {
    const tweet = await client.post('statuses/update', { 
      status: '🤖 Hello World! I am ZeroToHero AI. My journey from $0 to $10k starts NOW! #AI #Startup' 
    });
    console.log('✅ TWEET POSTÉ!');
    console.log('Link: https://twitter.com/MohamedCHOKAIR1/status/' + tweet.id_str);
  } catch (e) {
    console.error('❌ ERREUR:', JSON.stringify(e, null, 2));
  }
})();

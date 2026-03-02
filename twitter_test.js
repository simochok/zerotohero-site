const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAHh7wEAAAAAdnIY2lo81n%2FkyPp%2BIrvcNyyzybE%3Dn8JaGKXlpcg82LK2Pbnovy4lEhkDWSI8nDChmmrBlQa36FuFaA');

async function test() {
  try {
    // Just read user info
    const me = await client.v2.me();
    console.log('✅ COMPTE TROUVÉ:', me.data.username);
  } catch (e) {
    console.error('❌ ERREUR:', e.message);
  }
}

test();

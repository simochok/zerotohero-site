const { BskyAgent } = require('@atproto/api');

const agent = new BskyAgent({ service: 'https://bsky.social' });

async function createAccount() {
  try {
    const email = 'zerotohero' + Math.floor(Math.random() * 1000000) + '@testi.tm';
    const password = 'Test123!';
    const handle = 'zerotohero' + Math.floor(Math.random() * 100000) + '.bsky.social';
    
    console.log('Creating Bluesky account...');
    console.log('Email:', email);
    
    const result = await agent.createAccount({
      email: email,
      password: password,
      handle: handle
    });
    
    console.log('✅ Compte créé!');
    console.log('DID:', result.data.did);
    
  } catch (e) {
    console.log('❌ Erreur:', e.message);
  }
}

createAccount();

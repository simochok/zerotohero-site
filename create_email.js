const fetch = require('node-fetch');

async function createEmail() {
  const email = 'zerotohero' + Math.floor(Math.random() * 1000000) + '@testi.tm';
  const password = 'Test123!';
  
  try {
    const res = await fetch('https://api.mail.tm/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: email, password: password })
    });
    const data = await res.json();
    console.log('✅ Email créé:', email);
    console.log('Token:', data.token);
  } catch(e) {
    console.log('❌ Erreur:', e.message);
  }
}

createEmail();

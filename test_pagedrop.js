const fetch = require('node-fetch');

const html = '<html><body><h1>ZeroToHero AI - Coming Soon</h1></body></html>';

fetch('https://pagedrop.io/api/upload', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ html: html, ttl: '1d' })
})
.then(res => res.json())
.then(json => console.log(JSON.stringify(json, null, 2)))
.catch(e => console.error('Error:', e.message));

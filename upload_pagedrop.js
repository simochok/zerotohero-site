const fetch = require('node-fetch');
const fs = require('fs');

const html = fs.readFileSync('website/index.html', 'utf8');

const body = JSON.stringify({
  html: html,
  ttl: '7d'
});

fetch('https://pagedrop.io/api/upload', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: body
})
.then(res => res.json())
.then(json => console.log(json))
.catch(e => console.error('Error:', e.message));

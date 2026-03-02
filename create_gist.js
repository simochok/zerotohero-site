const fs = require('fs');
const https = require('https');

// Read the file
const html = fs.readFileSync('website/index.html', 'utf8');

const data = JSON.stringify({
  description: "ZeroToHero AI Site",
  public: true,
  files: {
    "index.html": {
      content: html
    }
  }
});

const options = {
  hostname: 'api.github.com',
  path: '/gists',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'ZeroToHeroAI'
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log(body);
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();

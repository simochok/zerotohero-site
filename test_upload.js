const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('website/index.html', 'utf8');
const base64 = Buffer.from(content).toString('base64');

console.log('File size:', content.length);

// This requires a GitHub token - but let me check if there's another way
// Actually I can create a Gist without OAuth!

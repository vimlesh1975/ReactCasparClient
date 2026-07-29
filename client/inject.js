const fs = require('fs');

const fabricCode = fs.readFileSync('c:/Users/vimlesh/Documents/vimlesh/ReactCasparClient/client/fabric_injection.js', 'utf8');
const htmlCode = fs.readFileSync('c:/Users/vimlesh/Documents/vimlesh/ReactCasparClient/client/html_injection.js', 'utf8');

const filePath = 'c:/Users/vimlesh/Documents/vimlesh/ReactCasparClient/client/src/games2/sports2/swimming2.js';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace('  return objects;', fabricCode + '\n  return objects;');
content = content.replace('  return `<div>Unknown Swimming Template</div>`;', htmlCode + '\n  return `<div>Unknown Swimming Template</div>`;');

// Fix SW110 Fabric
content = content.replace(
  "fill: 'linear-gradient(to right, #e2e8f0, #ffffff)'", 
  "fill: '#ffffff'"
);

// Fix SW110 HTML
content = content.replace(
  "background: linear-gradient(90deg, #e2e8f0 0%, #ffffff 100%);",
  "background: #ffffff;"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Injection successful!');

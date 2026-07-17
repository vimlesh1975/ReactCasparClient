const fs = require('fs');
const { execSync } = require('child_process');

try {
  const gitDate = execSync('git log -1 --format=%cd --date=format:"%d%m%Y_%H%M%S"').toString().trim();
  const fileContent = `export const buildDate = "${gitDate}";\n`;
  fs.writeFileSync('./src/buildDate.js', fileContent);
  console.log(`Updated buildDate to ${gitDate}`);
} catch (e) {
  console.error('Failed to get git date:', e.message);
}

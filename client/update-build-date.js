const fs = require('fs');
const path = require('path');

function getLatestModifiedTime(dirPath, latestTime = 0) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    // Skip the generated file so it doesn't cause a loop
    if (fullPath.includes('buildDate.js')) return;

    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      latestTime = getLatestModifiedTime(fullPath, latestTime);
    } else {
      if (stats.mtimeMs > latestTime) {
        latestTime = stats.mtimeMs;
      }
    }
  });

  return latestTime;
}

try {
  const srcDir = path.join(__dirname, 'src');
  const latestMs = getLatestModifiedTime(srcDir);
  const latestDate = new Date(latestMs);

  const pad = (n) => n.toString().padStart(2, '0');
  const formattedDate = `${pad(latestDate.getDate())}${pad(latestDate.getMonth() + 1)}${latestDate.getFullYear()}_${pad(latestDate.getHours())}${pad(latestDate.getMinutes())}${pad(latestDate.getSeconds())}`;

  const fileContent = `export const buildDate = "${formattedDate}";\n`;
  fs.writeFileSync(path.join(srcDir, 'buildDate.js'), fileContent);
  console.log(`Updated buildDate to ${formattedDate} based on last saved file`);
} catch (e) {
  console.error('Failed to get last modified file date:', e.message);
}

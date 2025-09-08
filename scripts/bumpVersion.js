const fs = require('fs');
const path = require('path');
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = require(packageJsonPath);

const versionSplit = packageJson.version.split('.').map(Number);
const bumpType = process.argv[process.argv.length - 1];
switch (bumpType) {
  case 'major':
    versionSplit[0] += 1;
    versionSplit[1] = 0;
    versionSplit[2] = 0;
    break;
  case 'minor':
    versionSplit[1] += 1;
    versionSplit[2] = 0;
    break;
  case 'patch':
    versionSplit[2] += 1;
    break;
  default:
    break;
}
packageJson.version = versionSplit.join('.');
fs.writeFileSync(
  packageJsonPath,
  JSON.stringify(packageJson, null, 2) + '\n',
  'utf8'
);
console.log(
  `Bumped version to ${packageJson.version}, will release a ${bumpType} update for this package.`
);

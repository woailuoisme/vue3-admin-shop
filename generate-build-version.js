const fs = require('fs')
const packageJson = require('./package.json')

const appVersion = packageJson.version
// const d = new Date()
// const format = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':')
const dt = new Date()
const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr)
const dFormat = `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(dt.getDate())} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(dt.getSeconds())}`
const versionEnd = `${dt.getFullYear()}${padL(dt.getMonth() + 1)}${padL(dt.getDate())}${padL(dt.getHours())}${padL(dt.getMinutes())}${padL(dt.getSeconds())}`;
const jsonData = {
  version: `${appVersion}.${versionEnd}`,
  date: dFormat,
}

const jsonContent = JSON.stringify(jsonData)

fs.writeFile('./public/version.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.log('An error occured while writing JSON Object to version.json')
    return console.log(err)
  }
  return console.log(`version.json file has been saved with version ${appVersion}`)
})
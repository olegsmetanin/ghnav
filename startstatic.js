var express = require('express')
var app = express()

const argv = require('minimist')(process.argv.slice(2))

const ASSET_PREFIX = argv['ASSET_PREFIX'] ? argv['ASSET_PREFIX'] : ''

app.use(ASSET_PREFIX, express.static(__dirname + '/out'))
app.listen(3001)

console.log(`open http://localhost:3001${ASSET_PREFIX}`)
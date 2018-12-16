const webpack = require('webpack')

const withTypescript  = require('@zeit/next-typescript');

const argv = require('minimist')(process.argv.slice(2))

const ASSET_PREFIX = argv['ASSET_PREFIX'] ? argv['ASSET_PREFIX'] : ''

console.log('Build', process.env.NODE_ENV, 'ASSET_PREFIX', argv['ASSET_PREFIX'])
// https://github.com/zeit/next.js/issues/4636
module.exports = withTypescript({
    assetPrefix: ASSET_PREFIX,
    webpack: function(config, {dev}) {

        config.plugins.push(
            new webpack.DefinePlugin({
              'process.env.ASSET_PREFIX': JSON.stringify(ASSET_PREFIX),
            })
        )

        if(!dev) {
            const originalEntry = config.entry;

            config.entry = async() => {
                const entries = await originalEntry();

               if(entries['main.js'] && !entries['main.js'].includes('./src/common/polyfills.js')) {
                    entries['main.js'].unshift('./src/common/polyfills.js');
                }

                return entries;
            }
        }

        return config;
    },
})
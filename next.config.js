const withTypescript  = require('@zeit/next-typescript');

// https://github.com/zeit/next.js/issues/4636
module.exports = withTypescript({
    assetPrefix: process.env.NODE_ENV === 'production' ? '/ghnav' : '',
    webpack: function(config, {dev}) {
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
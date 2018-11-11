module.exports = api => {
  api.cache(true)
  return {
    presets: ['next/babel', '@zeit/next-typescript/babel'],
    plugins: [
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
      [
        'transform-define',
        {
          'process.env.NODE_ENV': process.env.NODE_ENV
        }
      ],
      // https://github.com/zeit/next-plugins/issues/136
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            common: './src/common',
            modules: './src/modules'
          }
        }
      ]
    ],
    env: {
      test: {
        presets: [
          [
            'next/babel',
            {
              'preset-env': {
                modules: 'commonjs'
              }
            }
          ],
          '@zeit/next-typescript/babel'
        ]
      }
    }
  }
}

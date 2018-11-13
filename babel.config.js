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
            interfaces: '/src/interfaces',
            modules: './src/modules',
            fixtures: './src/fixtures',
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

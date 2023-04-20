/* eslint-env node */
'use strict';

module.exports = function(config) {
  config.set({
    files: [
      // https://app.segment.com/segment-libraries/sources/snippet/settings/keys
      'https://cdn.segment.com/analytics.js/v1/zCueSsEKipbrRgqbJarlTG8UJsAZWpkm/analytics.js',
      'test/**/*.test.js'
    ],

    browsers: ['PhantomJS'],

    frameworks: ['browserify', 'mocha'],

    reporters: ['spec', 'coverage'],

    preprocessors: {
      'test/**/*.js': 'browserify'
    },

    client: {
      mocha: {
        grep: process.env.GREP,
        reporter: 'html',
        timeout: 10000
      }
    },

    browserify: {
      debug: true,
      transform: [
        [
          'browserify-istanbul',
          {
            instrumenterConfig: {
              embedSource: true
            }
          }
        ]
      ]
    },

    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'html' },
        { type: 'json' }
      ]
    },

    plugins: [
      'karma-*'
    ]
  });
};

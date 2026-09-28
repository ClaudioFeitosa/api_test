const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  reporters: [
    'default',
    ['jest-junit',
      {
        outputDirectory: 'reports'
      }
    ],
    ['jest-html-reporters',
      {
        outputDirectory: 'reports',
        "publicPath": 'reports',
        "filename": "report.html",
        "openReport": true
      }
    ]
  ]
};
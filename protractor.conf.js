exports.config = {

  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:9515',
  baseUrl: 'http://192.168.0.42:9000/#',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'phantomjs',
    'phantomjs.cli.args': ['--ignore-ssl-errors=true',  '--web-security=false']
  },


  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [ './test/e2e/home.index.spec.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true
  }
};
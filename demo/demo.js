const genie = require('../index');

genie({
  port: 8080,
  routes: {
    '/MyWidget': require('./MyWidget'),
    '/StyledWidget': require('./StyledWidget'),
  },
});

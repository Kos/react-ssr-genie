const { createElement: h } = require('react');

module.exports = function MyWidget() {
  return h('h1', {}, 'I am a React component');
};

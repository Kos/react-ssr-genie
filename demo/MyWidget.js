const { createElement: h } = require('react');

module.exports = function MyWidget(props) {
  return h('div', {}, [
    h('h1', {}, 'I am a React component'),
    h('pre', {}, JSON.stringify(props, null, 2)),
  ]);
};

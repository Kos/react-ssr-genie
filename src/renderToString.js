const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { ServerStyleSheet } = require('styled-components');

module.exports = function renderToString(component, props) {
  const sheet = new ServerStyleSheet();
  const element = React.createElement(component, props);
  const markup = ReactDOMServer.renderToStaticMarkup(sheet.collectStyles(element));
  const styleTags = sheet.getStyleTags();
  return (styleTags + '\n' + markup).trim();
};

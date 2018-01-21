const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

module.exports = function serve({ port = 8012, routes = {} }) {
  const app = express();
  app.get('/', (req, res) => res.send('Hello world'));
  Object.keys(routes).forEach(route => {
    const component = routes[route];
    app.get(route, (req, res) => {
      const props = {};
      const element = React.createElement(component, props);
      const payload = ReactDOMServer.renderToStaticMarkup(element);
      res.send(payload);
    });
  });
  app.listen(port);
};

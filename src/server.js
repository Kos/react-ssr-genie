const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const renderToPDF = require('./renderToPDF');
const puppeteer = require('puppeteer');

module.exports = async function serve({ port = 8012, routes = {} }) {
  const app = express();
  const browser = await puppeteer.launch();
  app.get('/', (req, res) => res.send('Hello world'));

  Object.keys(routes).forEach(route => {
    const component = routes[route];
    app.get(route, (req, res) => {
      const props = {};
      const content = renderToString(component, props);
      res.send(content);
    });

    app.get(route + '/pdf', async (req, res) => {
      const props = {};
      const pageSettings = {};
      // const filename = 'page.pdf';
      const content = renderToString(component, props);
      const buffer = await renderToPDF(content, pageSettings, browser);
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        // 'Content-Disposition': 'attachment; filename=' + filename,
        'Content-Length': buffer.length,
      });
      res.end(buffer);
    });
  });

  app.listen(port);
};

function renderToString(component, props) {
  const element = React.createElement(component, props);
  return ReactDOMServer.renderToStaticMarkup(element);
}

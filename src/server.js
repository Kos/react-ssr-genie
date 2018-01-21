const express = require('express');
const bodyParser = require('body-parser');

const renderToPDF = require('./renderToPDF');
const renderToString = require('./renderToString');
const puppeteer = require('puppeteer');

module.exports = async function serve({ port = 8012, routes = {} }) {
  const app = express();
  app.use(bodyParser.json());

  const browser = await puppeteer.launch();
  app.get('/', (req, res) => res.send('Hello world'));

  Object.keys(routes).forEach(route => {
    const component = routes[route];
    app.get(route, (req, res) => {
      const props = {};
      const content = renderToString(component, props);
      res.end(content);
    });

    app.post(route, (req, res) => {
      const { props = {} } = req.body;
      const content = renderToString(component, props);
      res.end(content);
    });

    app.get(route + '/pdf', async (req, res) => {
      const props = {};
      const pageSettings = {};
      const content = renderToString(component, props);
      const buffer = await renderToPDF(content, pageSettings, browser);
      writePDF(buffer, res);
    });

    app.post(route + '/pdf', async (req, res) => {
      const { props = {}, pageSettings = {} } = req.body;
      const content = renderToString(component, props);
      const buffer = await renderToPDF(content, pageSettings, browser);
      writePDF(buffer, res);
    });
  });

  app.listen(port);
};

function writePDF(buffer, res) {
  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Length': buffer.length,
  });
  res.end(buffer);
}

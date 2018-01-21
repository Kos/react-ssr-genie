const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const puppeteer = require('puppeteer');

module.exports = async function serve({ port = 8012, routes = {} }) {
  const app = express();
  const browser = await puppeteer.launch();
  app.get('/', (req, res) => res.send('Hello world'));

  Object.keys(routes).forEach(route => {
    const component = routes[route];
    app.get(route, (req, res) => {
      const props = {};
      const payload = renderToString(component, props);
      res.send(payload);
    });

    app.get(route + '/pdf', async (req, res) => {
      const props = {};
      const pageSettings = {};
      // const filename = 'page.pdf';
      const buffer = await renderToPDF(component, props, pageSettings, browser);
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

const defaultPageSettings = {
  format: 'a4',
  margin: {
    top: '1cm',
    right: '1cm',
    bottom: '1cm',
    left: '1cm',
  },
};

async function renderToPDF(component, props, pageSettings, browser) {
  const page = await browser.newPage();
  try {
    const content = renderToString(component, props);
    await updatePageContent(page, content);
    const buffer = await page.pdf({
      ...defaultPageSettings,
      ...pageSettings,
    });
    return buffer;
  } finally {
    await page.close();
  }
}

async function updatePageContent(page, content) {
  const bodyHandle = await page.$('body');
  try {
    await page.evaluate((body, content) => (body.innerHTML = content), bodyHandle, content);
  } finally {
    await bodyHandle.dispose();
  }
}

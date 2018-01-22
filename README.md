# React SSR Genie

[![Build Status](https://travis-ci.org/Kos/react-ssr-genie.svg?branch=master)](https://travis-ci.org/Kos/react-ssr-genie)
![Experimental](https://img.shields.io/badge/status-experimental-red.svg)

A simple tool for simple server-side rendering needs

Status: **experimental**

## The story

Given a bunch of React components, I'd like to have a HTTP service that will render them for me with given `props`, as `text/html` or `application/pdf`, in order to...

1. allow a non-Node webapp to enjoy some server-side rendering
2. generate beautiful PDF versions of React-powered pages on the backend

## Usage

Start the server; define one route per React component you'd like to have rendered:

    genie({
      routes: {
        '/FirstWidget': require('./FirstWidget'),
        '/SecondWidget': require('./SecondWidget'),
        // ...
      },
    });

POST to the routes to render HTML:

    POST /FirstWidget
    Content-Type: application/json

    {
      "props": { /* ... */ }
    }

or PDF (see Puppetteer docs for [allowed pageSettings options](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions)):

    POST /FirstWidget/pdf
    Content-Type: application/json

    {
      "props": { /* ... */ },
      "pageSettings": {
        "format": "A4",
        "printBackground: true,
        "landscape": false
      }
    }

## Fun facts

[`styled-components`][styled-components] are supported out of the box.

PDFs are generated using [`puppeteer`][puppeteer] that wraps headless Chromium, giving you modern CSS support and some control over the page setup (paper size, margins).

## Inspiration

[Hypernova][hypernova]

## Howto

See [`demo.js`][demo]

## TODO

* [x] render text/html
* [x] render applicaiton/pdf
* [x] allow specifying props
* [x] allow specifying page setup
* [ ] proper tests
* [ ] test out in the real world, do some stress testing...

[demo]: demo/demo.js
[puppeteer]: https://github.com/GoogleChrome/puppeteer/
[styled-components]: https://www.styled-components.com/
[hypernova]: https://github.com/airbnb/hypernova

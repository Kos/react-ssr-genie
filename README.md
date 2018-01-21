# React SSR Genie

A simple tool for simple server-side rendering needs

Status: **experimental**

## The story

Given a bunch of React components, I'd like to have a HTTP service that will render them for me with given `props`, as `text/html` or `application/pdf`, in order to...

1. allow a non-Node webapp to enjoy some server-side rendering
2. generate beautiful PDF versions of React-powered pages on the backend

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

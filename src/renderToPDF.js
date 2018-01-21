const defaultPageSettings = {
  format: 'a4',
  margin: {
    top: '1cm',
    right: '1cm',
    bottom: '1cm',
    left: '1cm',
  },
  printBackground: true,
  displayHeaderFooter: false,
  landscape: false,
};

module.exports = async function renderToPDF(content, pageSettings, browser) {
  const page = await browser.newPage();
  try {
    await updatePageContent(page, content);
    const buffer = await page.pdf({
      ...defaultPageSettings,
      ...pageSettings,
    });
    return buffer;
  } finally {
    await page.close();
  }
};

async function updatePageContent(page, content) {
  const bodyHandle = await page.$('body');
  try {
    await page.evaluate((body, content) => (body.innerHTML = content), bodyHandle, content);
  } finally {
    await bodyHandle.dispose();
  }
}

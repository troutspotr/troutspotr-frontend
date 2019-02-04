const puppeteer = require('puppeteer')

const makePdfSize = (name, [x, y]) => {
  return {
    name,
    x,
    y
  }
}

const pdfSizes = [
  makePdfSize('A4', [210, 297]),
  makePdfSize('A3', [297, 420]),
  makePdfSize('A2', [420, 594]),
  makePdfSize('A1', [594, 841]),
  makePdfSize('A0', [841, 1189]),
]

console.log(puppeteer)
console.log('hello vince')

debugger
async function startBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  return {browser, page};
}

async function closeBrowser(browser) {
  return browser.close();
}

async function html2pdf(url) {
  const {browser, page} = await startBrowser();
  await page.goto(url);
  await page.emulateMedia('screen');
  await page.pdf({
        path: `${pdfSizes[0].name}-page.pdf`,
        format: pdfSizes[0].name,
        printBackground: true,
      });

      await page.pdf({
        path: `${pdfSizes[1].name}-page.pdf`,
        format: pdfSizes[1].name,
        printBackground: true,
      });

      await page.pdf({
        path: `${pdfSizes[2].name}-page.pdf`,
        format: pdfSizes[2].name,
        printBackground: true,
      });

      await page.pdf({
        path: `${pdfSizes[3].name}-page.pdf`,
        format: pdfSizes[3].name,
        printBackground: true,
      });
  closeBrowser(browser)
  console.log('done in general lol')
}


(async () => {
  debugger
  await html2pdf("https://www.codeandtheory.com/");
  process.exit(1);
})();

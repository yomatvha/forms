import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  test('test for null login', async () => {
    jest.setTimeout(20000);
    await page.goto(baseUrl);

    await page.waitForSelector('.form');

    const form = await page.$('.form');
    const input = await form.$('.input.login');
    const submit = await form.$('.btn.submit');

    await input.type('');
    await submit.click();

    await page.waitForSelector('.form-error-title');
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});

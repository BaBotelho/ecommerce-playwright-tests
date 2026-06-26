const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');
const GIFEncoder = require('gifencoder');
const PNG = require('png-js');

async function makeGif() {
    const width = 1200;
    const height = 800;
    const tempDir = path.join(__dirname, '..', 'assets');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const outputPath = path.join(tempDir, 'test-run.gif');
    const encoder = new GIFEncoder(width, height);
    const stream = fs.createWriteStream(outputPath);
    encoder.createReadStream().pipe(stream);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(1200);
    encoder.setQuality(10);

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width, height });
    await page.goto('https://www.saucedemo.com/');
    const screenshotPaths = [];

    screenshotPaths.push(path.join(tempDir, 'gif-step-1.png'));
    await page.screenshot({ path: screenshotPaths[0], fullPage: false });

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForURL(/inventory.html/);

    screenshotPaths.push(path.join(tempDir, 'gif-step-2.png'));
    await page.screenshot({ path: screenshotPaths[1], fullPage: false });

    await page.click('.shopping_cart_link');
    await page.waitForURL(/cart.html/);
    screenshotPaths.push(path.join(tempDir, 'gif-step-3.png'));
    await page.screenshot({ path: screenshotPaths[2], fullPage: false });

    await browser.close();

    for (const screenshotPath of screenshotPaths) {
        const pixels = await decodePng(screenshotPath);
        encoder.addFrame(pixels);
    }

    encoder.finish();
    console.log(`GIF generated at ${outputPath}`);
}

function decodePng(filePath) {
    return new Promise((resolve, reject) => {
        PNG.decode(filePath, (pixels) => {
            resolve(pixels);
        });
    });
}

makeGif().catch((error) => {
    console.error(error);
    process.exit(1);
});

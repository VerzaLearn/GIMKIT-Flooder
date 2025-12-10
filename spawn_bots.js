// spawn_bots.js
const puppeteer = require('puppeteer');

(async () => {
  const numBots = 60; // Number of bots to spawn
  const namePattern = "player{n}"; // Pattern for bot names
  const gameCode = "24319"; // Your Gimkit game code

  // Launch browser in non-headless mode to see actions
  const browser = await puppeteer.launch({ headless: false });
  
  for (let i = 1; i <= numBots; i++) {
    const botName = namePattern.replace("{n}", i);
    const page = await browser.newPage();

    // Navigate to the Gimkit join URL
    const gameUrl = `https://www.gimkit.com/join/${gameCode}`;
    await page.goto(gameUrl);

    // Wait for the name input to load
    await page.waitForSelector('input[name="name"]');

    // Enter bot name
    await page.type('input[name="name"]', botName);

    // Click the join button
    await page.click('button[type="submit"]');

    // Wait for game to load
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    console.log(`${botName} joined the game`);
  }

  // Keep browser open
  // To close all bots after 60 seconds, uncomment below:
  // setTimeout(async () => {
  //   await browser.close();
  // }, 60000);
})();

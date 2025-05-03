const { Builder, By, Key, until } = require('selenium-webdriver');

async function testGoogleSearch() {
  // Set up Chrome browser
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Open Google
    await driver.get('https://www.google.com');

    // Find the search box, type in query, and press Enter
    let searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenium WebDriver JavaScript', Key.RETURN);

    // Wait until the title changes
    await driver.wait(until.titleContains('Selenium WebDriver JavaScript'), 20000);

    console.log('Test Passed: Title contains the search term');
  } catch (err) {
    console.error('Test Failed:', err);
  } finally {
    await driver.quit();
  }
}

testGoogleSearch();

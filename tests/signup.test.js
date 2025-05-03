const { Builder, By, until } = require("selenium-webdriver");

async function testSignup() {
  // Launch Chrome browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the signup page
    await driver.get("http://localhost:30010/signup");

    // Fill Fullname
    await driver.findElement(By.css("input[placeholder='Fullname']")).sendKeys("John");

    // Fill Email
    await driver.findElement(By.css("input[placeholder='Email']")).sendKeys("john@example.com");

    // Fill Password
    await driver.findElement(By.css("input[placeholder='password']")).sendKeys("john@123");

    // Fill Confirm Password
    await driver.findElement(By.css("input[placeholder='confirm password']")).sendKeys("john@123");

    // Click the Signup button
    await driver.findElement(By.css("input[type='submit']")).click();

    // Wait for toast or redirect (adjust selector based on actual result)
    await driver.wait(until.elementLocated(By.css(".bg-slate-800")), 10000);

    console.log("Signup test passed ✅");

  } catch (error) {
    console.error("Signup test failed ❌", error);
  } finally {
    // Close browser
    await driver.quit();
  }
}

testSignup();

const { Builder, By, until, Key } = require("selenium-webdriver");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function testPasswordValidationOnce() {
  const password = "Bob@123"; // Set your password here

  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:30010/login");

    // // Fill Fullname and Email
    await driver.findElement(By.css("input[placeholder='Email']")).sendKeys("bob4@example.com");
    await sleep(2000); 
    // // Enter Password
    const passwordInput = await driver.findElement(By.css("input[placeholder='password']"));
    await passwordInput.sendKeys(password, Key.ENTER);
    // await sleep(5000); 
    // // Wait a moment for possible error rendering

    await driver.findElement(By.css("input[type='submit']")).click();
    await sleep(7000);

    const homeEle = await driver.findElements(By.css(".font-bold"));
    for (let el of homeEle) {
      const msg = await el.getText();
      if (msg.includes("Chats")){
        console.log("✅ Page change success");
        break;
      }
    }
    console.log("✅ Signup passed with password:", password);

  } catch (err) {
    console.error("❌ Test failed:", err.message);
  } finally {
    await driver.quit();
  }
}

testPasswordValidationOnce();

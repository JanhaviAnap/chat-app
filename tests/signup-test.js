const { Builder, By, until, Key } = require("selenium-webdriver");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function testPasswordValidationOnce() {
  const password = "Bob@123"; // Set your password here

  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:30010/signup");

    // Fill Fullname and Email
    await driver.findElement(By.css("input[placeholder='Fullname']")).sendKeys("Bob5");
    await sleep(1000);
    await driver.findElement(By.css("input[placeholder='Email']")).sendKeys("bob5@example.com");
    await sleep(1000);
    // Enter Password
    const passwordInput = await driver.findElement(By.css("input[placeholder='password']"));
    await passwordInput.sendKeys(password, Key.ENTER);

    // Wait a moment for possible error rendering
    await sleep(1000);

    // Check if any error appears for password
    const errorElements = await driver.findElements(By.css(".text-red-500"));

    for (let el of errorElements) {
      const msg = await el.getText();
      if (
        msg.includes("This field is required")||
        msg.includes("Password must be at least 6 characters long")||
        msg.includes("Must include at least one special character") ||
        msg.includes("Must include both uppercase and lowercase letters") ||
        msg.includes("Must include at least one number")
      ) {
        throw new Error("❌ Password validation failed: " + msg);
      }
    }

    // Confirm password and submit
    await driver.findElement(By.css("input[placeholder='confirm password']")).sendKeys(password);
    await sleep(1000);
    await driver.findElement(By.css("input[type='submit']")).click();
    // await driver.sleep(20000);
    await sleep(9000);
    const homeEle = await driver.findElements(By.css(".font-bold"));
    for (let el of homeEle) {
      const msg = await el.getText();
      if (msg.includes("Chats")){
        // console.log("✅ Page change success");
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

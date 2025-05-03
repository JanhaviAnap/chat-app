from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Option 1: If chromedriver is in PATH
driver = webdriver.Chrome()

# Option 2: If you want to specify the path manually
# driver = webdriver.Chrome(executable_path="C:\\WebDrivers\\chromedriver.exe")

driver.get("https://www.google.com")
time.sleep(2)

search_box = driver.find_element(By.NAME, "q")
search_box.send_keys("Selenium WebDriver")
search_box.submit()

time.sleep(5)
driver.quit()

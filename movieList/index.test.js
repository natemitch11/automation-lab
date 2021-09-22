const { Builder, Capabilities, By } = require('selenium-webdriver');
require('chromedriver');

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
    await driver.get('http://localhost:5500/movieList/index.html');
})

afterAll(async () => {
    await driver.quit();
})

test("This should Add a Movie", async ()=> {
    let searchBar = await driver.findElement(By.name('input'))
    await searchBar.sendKeys('John Wick\n')
    let button = await driver.findElement(By.name('button'))
    await button.click()
})

test("Should return an interesting result", async () => {
    await driver.get('http://google.com');
    let searchBar = await driver.findElement(By.name('q'))
    await searchBar.sendKeys('Never Gonna Give You Up\n')
    let link = await driver.findElement(By.xpath(`//*[@id="kp-wp-tab-overview"]/div[1]/div/div/div/div/div/div/div[2]/h3/a/h3`))
    await link.click()
    await driver.sleep(10000)
    let play = await driver.findElement(By.xpath(`//*[@id="movie_player"]/div[33]/div[2]/div[1]/button`))
    await play.click()
    await driver.sleep(26500)
})
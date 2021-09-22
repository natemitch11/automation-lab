const { Builder, Capabilities, By } = require('selenium-webdriver');
require('chromedriver');

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
    await driver.get('http://localhost:5500/movieList/index.html');
})

afterAll(async () => {
    await driver.quit();
})

const movie = 'The Lion King'

test("This should Add a Movie", async ()=> {
    let searchBar = await driver.findElement(By.name('input'))
    await searchBar.sendKeys(`${movie}\n`)
    let movieTitle = await driver.findElement(By.xpath(`//ul/li/span`)).getText()
    expect(movieTitle).toEqual(movie)
    await driver.sleep(100)
})
test("this should verify that the title is correct", async ()=>{
    await driver.sleep(500)
    let movieTitle = await driver.findElement(By.xpath(`//ul/li/span`)).getText()
    expect(movieTitle).toEqual(movie) 
})
test("this should cross off a movie", async ()=>{
    await driver.sleep(500)
    let title = await driver.findElement(By.xpath(`//ul/li/span`))
    await title.click()
    let movieClass = await driver.findElement(By.xpath(`//ul/li/span`)).getAttribute("class")
    expect(movieClass).toEqual('checked')
})

test("this should remove a movie", async ()=> {
    await driver.sleep(500)
    let button = await driver.findElement(By.xpath(`//ul/li/button`))
    await button.click()
    let ul = await driver.findElement(By.xpath("//ul")).getAttribute("innerHTML")
    expect(ul).toEqual('')
})

// test("Should return an interesting result", async () => {
//     await driver.get('http://google.com');
//     let searchBar = await driver.findElement(By.name('q'))
//     await searchBar.sendKeys('Never Gonna Give You Up\n')
//     let link = await driver.findElement(By.xpath(`//*[@id="kp-wp-tab-overview"]/div[1]/div/div/div/div/div/div/div[2]/h3/a/h3`))
//     await link.click()
//     await driver.sleep(10000)
//     let play = await driver.findElement(By.xpath(`//*[@id="movie_player"]/div[33]/div[2]/div[1]/button`))
//     await play.click()
//     await driver.sleep(26500)
// })
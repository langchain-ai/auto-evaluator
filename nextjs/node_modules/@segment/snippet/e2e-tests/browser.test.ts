import { remote } from 'webdriverio'

describe('Browser Test', () => {
  it('can load analytics JS and send a track call', async () => {
    const browser = await remote({
      capabilities: {
          browserName: 'chrome'
      }
    })

    await browser.url('http://localhost:8080/')

    const ready = await browser.$('#ready');
    ready.waitForExist({ timeout: 5000 })

    const trackBtn = await browser.$('#track')
    await trackBtn.click()

    const resultBox = await browser.$('#resultBox')
    resultBox.waitForExist({ timeout: 5000 })

    expect(await resultBox.getText()).toBe("success")

    await browser.deleteSession()
  })
})

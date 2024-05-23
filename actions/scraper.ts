'use server'
import playwright from 'playwright'
import * as cheerio from 'cheerio'

let obj: any = {}
let arr: any = []

export const onScrapeEmuCalender = async () => {
  try {
    console.log('getting data')
    const browser = await playwright.chromium.launch({ headless: true })

    const page = await browser.newPage()
    await page.goto(
      'https://www.emu.edu.tr/en/academics/calendar/academic-calendar-2024-2025/1771'
    )

    let html = await page.content()

    const $ = cheerio.load(html)
    obj['table'] = $('tr').text()

    arr.push(obj)

    await browser.close()

    return arr[0].table.split('\n')
  } catch (error) {
    console.log(error)
  }
}

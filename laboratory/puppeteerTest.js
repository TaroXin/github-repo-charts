/* eslint-disable @typescript-eslint/no-var-requires */

const puppeteer = require('puppeteer')
const options = require('./echartsOptions')

const render = async (options) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  })

  const page = await browser.newPage()
  await page.setContent(`
    <div id="container" style="width:600px;height:400px;"></div>
  `)

  await page.evaluate((options) => {
    window.chart = {
      options,
    }
  }, options)

  await page.addScriptTag({
    url: 'https://cdn.bootcdn.net/ajax/libs/echarts/4.8.0/echarts.min.js',
  })

  //echarts 初始化脚本注入页面
  await page.addScriptTag({
    content: `
      (function (window) {
          let option = window.chart.options;
          var myChart = window.echarts.init(document.getElementById('container'), null, {
              renderer: 'svg'
          });
          myChart.setOption(option);
      })(this);
    `,
  })

  // const $el = await page.$('#container')
  // console.log($el.asElement())

  const eles = await page.$eval('#container svg', (el) => el.outerHTML)

  console.log(eles)

  await page.close()
  await browser.close()
}

render(options)

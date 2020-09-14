/* eslint-disable */
const echarts = require('echarts')
const { JSDOM } = require('jsdom')
const options = require('./echartsOptions')
require('zrender/lib/svg/svg')

const dom = new JSDOM(`<!DOCTYPE html>
    <div id="app" style="width: 600px;height:400px;"></div>
  `,
  {
    runScripts: 'dangerously',
    includeNodeLocations: true
  }
)

const chartContainer = dom.window.document.getElementById('app')
global.window = dom.window
global.document = global.window.document
global.navigator = global.window.navigator

const tempDocument = (new JSDOM(`...`)).window.document;
var svg = tempDocument.createElementNS("http://www.w3.org/2000/svg", "svg");
function cheatCreateElementNS (ns, name) {
  var el = svg
  el.createSVGPoint = () => {
    return {
      matrixTransform: () => {
        console.log(111)
        return el.createSVGPoint();
      }
    }
  };
  el.getScreenCTM = () => {
    return {
      e: {}
    }
  }
  return el;
}
document.createElementNS = cheatCreateElementNS;

const chart = echarts.init(chartContainer, null, { renderer: 'svg' })
chart.setOption(options)

console.log(chartContainer.innerHTML)

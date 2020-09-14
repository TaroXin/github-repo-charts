/* eslint-disable @typescript-eslint/no-var-requires */

const chartistSvg = require('svg-chartist')

const data = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  series: [
    [12, 9, 7, 8, 5],
    [2, 1, 3.5, 7, 3],
    [1, 3, 4, 5, 6],
  ],
}

const options = {
  fullWidth: true,
  chartPadding: {
    right: 40,
  },
  title: 'juejin-im/open-source',
  subtitle: 'Star 成长轨迹',
}

const opts = {
  options: options,
}

chartistSvg('line', data, opts).then((html) => {
  console.log(html)
})

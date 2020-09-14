module.exports = (data) => {
  return {
    legend: {
      width: 600,
      height: 400,
    },
    animation: false,
    title: {
      text: 'juejin-im/open-source',
      subtext: 'Star growth curve',
    },
    grid: {
      left: '3%',
      right: '1%',
      bottom: '0',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'time',
        boundaryGap: false,
      },
    ],
    yAxis: {
      position: 'right',
    },
    series: [
      {
        type: 'line',
        areaStyle: {},
        data,
        smooth: true,
        symbol: 'none',
      },
    ],
  }
}

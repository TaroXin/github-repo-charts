module.exports = (data, options) => {
  return {
    animation: false,
    title: {
      text: options.title,
      textStyle: {
        color: '#2468cf',
        fontSize: 18,
        fontWeight: 'bold',
      },
      subtext: options.subtitle + '.  Powered by github-repo-charts',
      subtextStyle: {
        color: '#7e848a',
        fontSize: 12,
      },
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
        nameLocation: 'center',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: {
      position: 'right',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        type: 'line',
        data,
        smooth: true,
        smoothMonotone: 'x',
        symbol: 'none',
        lineStyle: {
          color: '#2468cf',
        },
        areaStyle: {
          color: '#2468cf',
        },
      },
    ],
  }
}

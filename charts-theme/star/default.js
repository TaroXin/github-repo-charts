module.exports = (data, options) => {
  const grid = {
    left: '3%',
    right: '1%',
    bottom: '0',
    containLabel: true,
  }

  if (!options.showTitle && !options.showSubtitle) {
    grid.top = '2%'
  } else if (!options.showTitle || !options.showSubtitle) {
    grid.top = '40px'
  }

  return {
    animation: false,
    title: {
      show: options.showTitle || options.showSubtitle,
      text: options.showTitle ? options.title : '',
      textStyle: {
        color: '#2468cf',
        fontSize: 18,
        fontWeight: 'bold',
      },
      subtext: options.showSubtitle
        ? options.subtitle + '.  Powered by github-repo-charts'
        : '',
      subtextStyle: {
        color: '#7e848a',
        fontSize: 12,
      },
    },
    grid,
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

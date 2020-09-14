module.exports = (data) => {
  return {
    animation: false,
    title: {
      text: 'juejin-im/open-source',
      textStyle: {
        color: '#2468cf',
        fontSize: 18,
        fontWeight: 'bold',
      },
      subtext: 'Star growth curve.  Power by Github-Repo-Charts',
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

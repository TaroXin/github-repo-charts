module.exports = (data, options) => {
  const defaultColors = [
    '#c23531',
    '#2f4554',
    '#61a0a8',
    '#d48265',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3',
  ]

  let legend = {
    left: 'center',
    top: 'bottom',
    data: options.legendItems,
  }

  if (options.legendItems.length > 5) {
    legend = new Array(Math.ceil(options.legendItems.length / 5))
      .fill(null)
      .map((_, index) => ({
        left: 'center',
        top: 'bottom',
        data: options.legendItems.slice(index * 5, index * 5 + 5),
      }))
  }

  return {
    animation: false,
    color: options.colors.length ? options.colors : defaultColors,
    title: {
      show: options.showTitle || options.showSubtitle,
      text: options.showTitle ? options.title : '',
      textStyle: {
        color: '#2468cf',
        fontSize: 18,
        fontWeight: 'bold',
      },
      subtext: options.showSubtitle ? 'Powered by github-repo-charts' : '',
      subtextStyle: {
        color: '#7e848a',
        fontSize: 12,
      },
      left: 'center',
    },
    legend,
    series: [
      {
        type: 'pie',
        radius: [30, 110],
        roseType: 'area',
        data,
      },
    ],
  }
}

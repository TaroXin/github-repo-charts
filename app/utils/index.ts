// 格式化语言数组
export function formatLanguageList(data: any): [any[], string[], string[]] {
  const nodes: any = []
  data.user.repositories.nodes.forEach((l) => {
    if (l.languages.edges && !l.isFork) {
      l.languages.edges.forEach((item) => {
        const exists = nodes.find((el) => el.id === item.node.id)
        if (exists) {
          exists.value += item.size
        } else {
          nodes.push({
            ...item.node,
            value: item.size,
          })
        }
      })
    }
  })

  nodes.sort((a, b) => b.value - a.value)
  const colors = nodes.map((item) => item.color)
  const items = nodes.map((item) => item.name)
  return [nodes, colors, items]
}

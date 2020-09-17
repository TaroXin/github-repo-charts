export default class ChartsOptions {
  title: string
  subtitle: string
  theme?: 'default' = 'default'
  showTitle? = true
  showSubtitle? = true
  colors?: string[] = []
  legendItems?: string[] = []
}

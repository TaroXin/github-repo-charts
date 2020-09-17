<p align="center">
 <img width="100px" src="https://gworld-others.oss-cn-shenzhen.aliyuncs.com/icon_60pt%402x.png" align="center" alt="Github Repo Charts" />
 <h2 align="center">Github Repo Charts</h2>
 <p align="center">为你的 README 生成 GitHub 仓库成长图，个人数据报表</p>
</p>
  <p align="center">
    <a href="https://github.com/TaroXin/github-repo-charts/issues">
      <img alt="Issues" src="https://img.shields.io/github/stars/TaroXin/github-repo-charts?color=007755&style=for-the-badge" />
    </a>
    <a href="https://github.com/TaroXin/github-repo-charts/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/TaroXin/github-repo-charts?color=0088ff&style=for-the-badge" />
    </a>
    <a href="https://github.com/TaroXin/github-repo-charts/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/TaroXin/github-repo-charts?color=0088ff&style=for-the-badge" />
    </a>
    <br />
  </p>

  <p align="center">
    <a href="https://github.com/TaroXin/github-repo-charts/issues/new/choose">
      <img alt="GitHub Report Bug" src="https://img.shields.io/badge/提交Bug-%230088cc?style=for-the-badge" />
    </a>
    <a href="https://github.com/TaroXin/github-repo-charts/issues/new/choose">
      <img alt="GitHub Report Bug" src="https://img.shields.io/badge/提交功能需求-%23ff7b2b?style=for-the-badge" />
    </a>
  </p>
  <!-- <p align="center">
    <a href="/">简体中文</a>
    ·
    <a href="/docs/readme_en.md">English</a>
  </p> -->
</p>

## 特性
* [生成 Github 仓库 Stars 成长图例](#生成-Github-仓库-Stars-成长图例)
* [生成 Github 仓库 Forks 成长图例](#生成-Github-仓库-Forks-成长图例)
* [生成仓库语言图](#生成仓库语言图)
* [全部 Demo](#全部-Demo)
* [开发](#开发)
* [TODO](#TODO)

## 生成 Github 仓库 Stars 成长图例

> Github Star 成长图例是循环访问了 Github API 并获取到仓库的 Star 列表，由于 API 的限制，我们不能完美的获取到所有 Star 和其对应的时间节点，所以只提供了少于 500Star 项目的图例，如果你的项目 Star 数超过500，那么图例也仅仅会渲染前500条，姑且认为超过500条的项目已经是稍微成熟点的项目了，哈哈
<br>

将以下代码复制到你的 markdown 文件中，即可欣赏你的仓库成长图了<br/>
需要更新 `repo=` 为你的仓库名称，`owner=` 为你的用户名称<br>

```md
![TaroXin Repo Star](http://repo-charts.taroxin.cn/api/repo/starChart?repo=vue-pretty-logger&owner=TaroXin)
```

#### 设置标题与副标题

在图例中，我们默认使用 `${owner}/${repo}` 的形式作为主标题，`Star 成长曲线` 作为副标题，你也可以通过传参来修改他们<br>
修改 `title=` 为你的主标题，`subtitle=` 为你的副标题<br>
你也可以使用 `showTitle=true` 或者 `showSubtitle=false` 来控制主标题与副标题的隐藏
```md
![TaroXin Repo Star](http://repo-charts.taroxin.cn/api/repo/starChart?repo=vue-pretty-logger&owner=TaroXin&title=My-Repo-Star&subtitle=我的仓库成长轨迹)
```

## 生成 Github 仓库 Forks 成长图例

> Forks 与 Stars 的原因一样，出于 Github API 的限制，我们只能获取到500条数据
<br>

以下代码即可生成Forks成长图例，或许你已经注意到，我们只是加了一个特殊的参数 `from=fork`，`from`参数用于区分数据来源于`star`还是`fork`，如果你不传递该参数，则默认使用`star`，其他参数与获取 Star 图例的接口一致<br>

```md
![TaroXin Repo Star](http://repo-charts.taroxin.cn/api/repo/starChart?repo=vue-pretty-logger&owner=TaroXin&from=form)
```

## 生成仓库语言图

该图例支持两种生成方式，当 `owner=` 不为空时，会获得该用户名下所有仓库的语言图，如果 `owner=` 和 `repo=` 皆不为空的时候，会生成该仓库的语言图<br>
> 图例的颜色选项来自 GitHub, GitHub 对每一种语言都有唯一的颜色定义

#### 获取用户所有语言
```md
![TaroXin Language](http://repo-charts.taroxin.cn/api/repo/languageChart?owner=TaroXin)
```

<p align="center">
  <img alt="TaroXin Language" src="http://repo-charts.taroxin.cn/api/repo/languageChart?owner=TaroXin" />
</p>


#### 获取单个仓库语言

```md
![TaroXin Repo Language](http://repo-charts.taroxin.cn/api/repo/languageChart?owner=TaroXin&repo=vue-pretty-logger)
```

<p align="center">
  <img alt="TaroXin Repo Language" src="http://repo-charts.taroxin.cn/api/repo/languageChart?owner=TaroXin&repo=vue-pretty-logger" />
</p>

## 全部 Demo
![](http://repo-charts.taroxin.cn/api/repo/starChart?repo=vue-pretty-logger&owner=TaroXin)
![](http://repo-charts.taroxin.cn/api/repo/starChart?repo=open-source&owner=juejin-im)
![](http://repo-charts.taroxin.cn/api/repo/starChart?repo=open-source&owner=juejin-im&from=fork)

## 开发

如果你有意参与此项目，或者你仅仅只是想本地运行，那么你只需要以下步骤即可正常运行

#### 步骤一
我们需要你把项目正确的clone下来，并安装相关依赖，需要注意的是，项目中含有 [puppeteer](https://github.com/puppeteer/puppeteer) 相关依赖，如果存在下载不成功的情况，请参阅其他文档

```bash
git clone https://github.com/TaroXin/github-repo-charts.git
cd github-repo-charts && npm i
```

#### 步骤二
新建 `.env` 文件，这是我们的私有变量文件，存储个人的`Github Access Token`以及我们需要用作数据缓存的`Redis`相关配置，以下配置不可用，需要你配置好自己的数据
```bash
GITHUB_ACCESS_TOKEN=<Your Token>

REDIS_IP=<Redis ip>
REDIS_PORT=<Redis port>
REDIS_PASSWORD=<Redis password>

```

#### 步骤三
运行项目，并访问
```bash
npm run dev
open http://localhost:7001/api/repo/starChart
```
你会得到一个`422`错误，来提醒你缺少相应的参数配置

## TODO
* 生成原创项目 Star 与 Fork 对比柱状图
* 生成 Github 数据主页
* Docker 私有化部署
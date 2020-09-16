<p align="center">
 <img width="100px" src="https://gworld-others.oss-cn-shenzhen.aliyuncs.com/icon_60pt%402x.png" align="center" alt="Github Repo Charts" />
 <h2 align="center">Guthub Repo Charts</h2>
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
* [生成 Github 仓库 Star 成长图例](#生成-Github-仓库-Star-成长图例)
* [全部 Demo](#全部-Demo)

## 生成 Github 仓库 Star 成长图例

> Github Star 成长图例是循环访问了 Github API 并获取到仓库的 Star 列表，由于 API 的限制，我们不能完美的获取到所有 Star 和其对应的时间节点，所以只提供了少于 500Star 项目的图例，如果你的项目 Star 数超过500，那么图例也仅仅会渲染前500条，姑且认为超过500条的项目已经是稍微成熟点的项目了，哈哈

将以下代码复制到你的 markdown 文件中，即可欣赏你的仓库成长图了
需要更新 `repo=` 为你的仓库名称，`owner=` 为你的用户名称
```md
![TaroXin Repo Star](http://repo-charts.taroxin.cn/api/repo/starChart?repo=vue-pretty-logger&owner=TaroXin)
```

#### 设置标题与副标题

在图例中，我们默认使用 `${owner}/${repo}` 的形式作为主标题，`Star 成长曲线` 作为副标题，你也可以通过传参来修改他们
修改 `title=` 为你的主标题，`subtitle=` 为你的副标题
你也可以使用 `showTitle=true` 或者 `showSubtitle=false` 来控制主标题与副标题的隐藏
```md
![TaroXin Repo Star](http://repo-charts.taroxin.cn/api/repo/starChart?repo=vue-pretty-logger&owner=TaroXin&title=My-Repo-Star&subtitle=我的仓库成长轨迹)
```

## 全部 Demo
![](http://repo-charts.taroxin.cn/api/repo/starChart?repo=vue-pretty-logger&owner=TaroXin)
![](http://repo-charts.taroxin.cn/api/repo/starChart?repo=open-source&owner=juejin-im)
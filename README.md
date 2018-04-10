<br>
<p align="center">
  <img width="140px" src="https://cdn.rawgit.com/waynecz/translate-and-remember-it-crx/492375e0/src/logo.png" alt="Dadda" />
</p>
<br>

# Dadda（达达）

> 当前为测试版本，建议上架应用商店后去下载应用商店的版本，以便以后更新，预计上架日期 ·4.12·

<br>

![Chrome 60+](https://img.shields.io/badge/chrome-60%2B-blue.svg?style=for-the-badge)
![Webpack 4.0+](https://img.shields.io/badge/webpack-4-brightgreen.svg?style=for-the-badge)

😍 漂亮的划词翻译插件 / 让你在 Chrome 上背单词

<br>

## 特性

* 自带「生词簿」，可同步至其他桌面 Chrome 设备
* 基于记忆曲线的「吐司弹词」
* 基于牛津字典的「英英翻译」、「例句」
* 外链「词根词缀」
* 颜值？

<br>

## 截图

![presentation](https://raw.githack.com/waynecz/dadda-translate-crx/master/src/assets/presentation.gif)

<br>

<details><summary>其他截图</summary><br>
<img width="100%" src="https://raw.githack.com/waynecz/dadda-translate-crx/master/src/assets/vocabulary.jpg" alt="生词簿" />
<br>
<img width="100%" src="https://raw.githack.com/waynecz/dadda-translate-crx/master/src/assets/toast.jpg" alt="吐司" />
<br>
</details>

<br>

## 下载

> 注意，如果你是上架之前就在使用插件的测试用户，在商店重新安装插件将会丢失原本的生词簿内容，暂无解决方法，请知悉！

* Chrome 商店安装（正在审核）
* [手动下载](https://github.com/waynecz/dadda-translate-crx/releases)安装

<br>

## 使用须知 `!important`

* 单词被收入生词簿后有五个阶段，分别对应 <b color="red">红</b> / <b color="orange">橘</b> / <b color="yellow">黄</b> / <b color="blue">蓝</b> / <b color="limegreen">绿</b>
* 每个阶段的吐司间隔分别为 5 分钟、30 分钟、1 小时、6 小时、12 小时
* 在每次吐司弹词后，点击吐司主体或者点击 close 按钮将被视为把单词推入下一个阶段
* 可以在吐司中点击 `More` -> `斩掉这个单词`

<br>

## 一起帮助完善这个插件

> 当前有个强烈的需求是单词簿导出扇贝、Anki 格式，如果您拥有这方面的经验或者很想尝试开发这个，十分感谢如果能有你的帮助一起开发

在你开始开发前，关于项目代码的情况，可以阅读[这份开发文档, 还没写，不用点](https://github.com/waynecz/dadda-translate-crx/blob/master/DEV.md)，当然也可直接联系我 🤪

## 可能还要做的

* [ ] 导出扇贝、Anki 格式的生词簿
* [ ] 面板内添加词根词缀

<br>

## FAQ

<details><summary>为什么又要做一个翻译插件</summary><br>
最近在学英语，发现在网页上阅读英语文章时看到生词光翻译个中文总是远远达不到学会这个单词的目的，经常第二次看到就忘了，第一是缺少英英翻译，第二是缺少主动回溯的手段（生词本），查看了下市面上的插件，并没有特别适合自己的，所以就做了这个插件
<br>
<br>
</details>

<details><summary>为什么用搜狗翻译</summary><br>
针对长句翻译，搜狗还是有点东西的，可以看 V友的讨论 <a href="https://www.v2ex.com/t/430327">各位，我觉得搜狗翻译成精了</a>
<br>
<br>
</details>

<details><summary>为什么叫达达</summary><br>
达达是我主子，血统纯正的 <a href="https://baike.baidu.com/item/%E7%8B%B8%E8%8A%B1%E7%8C%AB/987844?fromtitle=%E4%B8%AD%E5%9B%BD%E7%8B%B8%E8%8A%B1%E7%8C%AB&fromid=4535437" target="_blank">Chines Li Hua</a>，放张照片，凡人们
<br>
<img width="100%" src="https://raw.githack.com/waynecz/dadda-translate-crx/master/src/assets/dadda.jpg" alt="Dadda" />
<br>
</details>

<br>

## 感谢

* [划词翻译](https://github.com/Selection-Translator/crx-selection-translate)@[mingkaili](https://github.com/lmk123)
* [fonts.css](https://github.com/zenozeng/fonts.css)@[zenozend](https://github.com/zenozeng)

<br>

## 许可

MIT

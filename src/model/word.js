class Word {
  constructor({ t, e, r, p, d }) {
    /**
     * 为了节省存储空间，key 都压缩成一个字母
     * @name t text
     * @name e eg
     * @name c createTime
     * @name r 单词出处 URL
     * @name s stage 当前的阶段
     * @name p phonetic 发音
     * @description stage: 分为5各阶段 分别是 5分钟-30分钟-1小时-6小时-12小时 每个阶段通过 notification 提醒一次
     */
    this.t = t
    this.e = e
    this.r = r
    this.p = p
    this.c = +new Date()
    this.s = 1
  }
}

export default Word

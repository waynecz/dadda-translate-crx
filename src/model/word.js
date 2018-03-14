class Word {
  constructor({ text, eg }) {
    this.text = text
    this.eg = eg
    this.createTime = +new Date()
    this.stage = 1
  }
}

export default Word

export default function exportFile(vocabularies) {
  const rows = []
  // 只导出了 word 和 example
  vocabularies.forEach((o) => {
    rows.push([o.t, o.e])
  })
  let csvContent = 'data:text/csv;charset=utf-8,'
  rows.forEach(function (rowArray) {
    let row = rowArray.join(',')
    csvContent += row + '\r\n'
  })

  var encodedUri = encodeURI(csvContent)
  var link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'my_vocabulary_dada.csv')
  link.innerHTML = 'Click Here to download'
  document.body.appendChild(link) // Required

  link.click()
}

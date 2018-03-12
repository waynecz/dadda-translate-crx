import api from '@/api'

/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener((request, sender, sendRes) => {
  if (request.name === 'translate') {
    api.sougouTranslate(request.text).then(res => {
      sendRes(res)
    })
    return true
  }
})

/**
 * @summary 开发模式 hotreload 插件
 */
const filesInDirectory = dir =>
  new Promise(resolve =>
    dir.createReader().readEntries(entries =>
      Promise.all(
        entries
          .filter(e => e.name[0] !== '.')
          .map(e => (e.isDirectory ? filesInDirectory(e) : new Promise(resolve => e.file(resolve))))
      )
        .then(files => [].concat(...files))
        .then(resolve)
    )
  )

const timestampForFilesInDirectory = dir =>
  filesInDirectory(dir).then(files => files.map(f => f.name + f.lastModifiedDate).join())

const reload = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs[0]) {
      chrome.tabs.reload(tabs[0].id)
    }

    chrome.runtime.reload()
  })
}

const watchChanges = (dir, lastTimestamp) => {
  timestampForFilesInDirectory(dir).then(timestamp => {
    if (!lastTimestamp || lastTimestamp === timestamp) {
      setTimeout(() => watchChanges(dir, timestamp), 1000) // retry after 1s
    } else {
      reload()
    }
  })
}

chrome.management.getSelf(self => {
  if (self.installType === 'development') {
    chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir))
  }
})

/**
 * Modify from https://github.com/xpl/crx-hotreload
 */
import * as browser from 'webextension-polyfill'

const filesInDirectory = (dir): Promise<any[]> => {
  return new Promise(resolve =>
    dir.createReader().readEntries(entries =>
      Promise.all(
        entries
          .filter(e => e.name[0] !== '.')
          .map(
            e =>
              e.isDirectory
                ? filesInDirectory(e)
                : new Promise(resolve => e.file(resolve))
          )
      )
        .then(files => [].concat(...files))
        .then(resolve)
    )
  )
}

const timestampForFilesInDirectory = (dir): Promise<string> => {
  return filesInDirectory(dir).then(files =>
    files.map(f => f.name + f.lastModifiedDate).join()
  )
}

const reload = async (): Promise<void> => {
  // NB: see https://github.com/xpl/crx-hotreload/issues/5
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })

  if (tabs[0]) {
    browser.tabs.reload(tabs[0].id)
  }

  browser.runtime.reload()
}

const watchChanges = (dir: string, lastTimestamp?: string) => {
  timestampForFilesInDirectory(dir).then(timestamp => {
    if (!lastTimestamp || lastTimestamp === timestamp) {
      setTimeout(() => watchChanges(dir, timestamp), 1000) // retry after 1s
    } else {
      reload()
    }
  })
}

export default async (): Promise<void> => {
  const self = await browser.management.getSelf()
  if (self.installType === 'development') {
    browser.runtime.getPackageDirectoryEntry(dir => watchChanges(dir))
  }
}

import { _wrapTRId } from '@/utils'

export default ({ delayInMinutes, word }) => {
  const alarmId = _wrapTRId(word)

  chrome.alarms.clear(alarmId, wasCleared => {
    chrome.alarms.create(alarmId, {
      delayInMinutes,
      periodInMinutes: delayInMinutes
    })
  })
}

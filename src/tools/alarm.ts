import { addPrefix } from '@tools/dadda'
import * as browser from 'webextension-polyfill'
import { IAlarmConfig } from '@models/dadda'

class alarm {
  async add({ delayInMinutes, wordTxt }: IAlarmConfig): Promise<void> {
    const alarmID = addPrefix(wordTxt)

    await browser.alarms.clear(alarmID)

    browser.alarms.create(alarmID, {
      delayInMinutes,
      periodInMinutes: delayInMinutes
    })
  }

  remove(wordTxt: string) {
    browser.alarms.clear(addPrefix(wordTxt))
  } 
}

const Alarm = new alarm()
export default Alarm

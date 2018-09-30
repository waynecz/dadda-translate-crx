import { TR_SETTING_BLACK_LIST_KEY, TR_ID_PREFIX } from '@configs/storage-keys'
import Storage from '@tools/storage';

export const isInBlackList = async (host: string): Promise<boolean> => {
  host = host || new URL(location.href).host

  const blackList = await Storage.get(TR_SETTING_BLACK_LIST_KEY, {})

  return (blackList[host] as boolean) || false
}

export const addPrefix = (word: string): string => TR_ID_PREFIX + word

export const hasPrefix = (word: string): boolean => word.slice(0, TR_ID_PREFIX.length) === TR_ID_PREFIX

export const removePrefix = (word: string): string => word.slice(TR_ID_PREFIX.length)
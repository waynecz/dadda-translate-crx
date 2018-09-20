import { TR_LOG_PREFIX } from '@configs/storage-keys'

export default function logger(...parm) {
  return console.log(TR_LOG_PREFIX, ...parm)
}

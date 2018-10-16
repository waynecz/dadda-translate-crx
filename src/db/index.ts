import RxDB from 'rxdb'
import { TR_VOCABULARY_STORE_KEY } from '@configs/storage-keys'

RxDB.plugin(require('pouchdb-adapter-idb'))
;(async function() {
  const database = await RxDB.create({
    name: TR_VOCABULARY_STORE_KEY,
    adapter: 'idb',
    multiInstance: true
  })

  database.collection({
    name: 'vocabulary',
    schema: {
      title: 'word',
      version: 0,
      type: 'object',
      properties: {
        text: {
          type: 'string'
        }
      },
      required: ['text']
    }
  })
})()

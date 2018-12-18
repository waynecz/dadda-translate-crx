import RxDB, { RxDatabase, RxCollection, RxJsonSchema, RxDocument } from 'rxdb'
import { TR_VOCABULARY_STORE_KEY } from '@configs/storage-keys'
import { DaddaDatabase, DaddaDatabaseCollections } from '@models/db';

RxDB.plugin(require('pouchdb-adapter-idb'))
;(async function() {
  const database: DaddaDatabase = await RxDB.create<DaddaDatabaseCollections>({
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

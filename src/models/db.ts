import { RxDocument, RxCollection, RxDatabase } from "rxdb";
import { IWord } from "./dadda";

export type WordDocument = RxDocument<IWord>

type VocabularyCollectionMethods = {
  has: () => Promise<boolean>;
}

export type VocabularyCollection = RxCollection<WordDocument, VocabularyCollectionMethods>

export type DaddaDatabaseCollections = {
  vocabulary: VocabularyCollection
}

export type DaddaDatabase = RxDatabase<DaddaDatabaseCollections>
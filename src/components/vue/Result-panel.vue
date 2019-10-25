<template>
  <div
    class="__result"
    @wheel.stop="e => e.preventDefault()"
    @mouseup.stop="onMouseUp"
    :class="[
      {
        '__result--invisible': !visible,
        '__is-dialog': isDialog,
        '__is-input--visible': inputVisible
      },
      font
    ]"
  >
    <!-- 头部 -->
    <div class="__result_origin">
      <div class="__result_meta">
        <h5
          class="__result_word"
          :class="{ '__result_word--sentence': !inDict }"
        >
          {{ text }}
        </h5>

        <template v-if="inDict">
          <div
            v-for="(phonetic, i) in phonetics"
            class="__result_pronunciation __tooltip __top"
            :tooltip="phonetic.filename ? '点击发音' : '暂无发音'"
            :key="phonetic.filename || i"
            @click.stop="e => (phonetic.filename ? speak(phonetic.type) : e)"
          >
            <div
              class="__result_flag"
              :class="`__result_flag--${phonetic.type}`"
            ></div>
            <div class="__result_phonetic">[{{ phonetic.text }}]</div>
            <audio
              :id="`x__result_${phonetic.type}-${uuid}`"
              :src="`https:${phonetic.filename}`"
              class="__result_audio"
            />
          </div>
        </template>
      </div>

      <audio
        v-if="!inDict"
        :id="`x__result-${uuid}`"
        :src="dict.phonetic"
        class="__result_audio"
      />

      <div class="__result_chinese __result_chinese--brief">
        {{ currentEnglishMeaning }}
      </div>

      <!-- 收藏 -->
      <div
        v-if="!$root.inExtension"
        class="__result_star __tooltip __left"
        :class="{ '__result_star--ed': inCollection }"
        :tooltip="inCollection ? '从生词簿内删除' : '加入生词簿'"
        @click.stop="toggleCollect"
      >
        <i
          class="__icon"
          :class="[inCollection ? '__icon-star-solid' : '__icon-star']"
        ></i>
      </div>
    </div>

    <!-- 牛津翻译部分 -->
    <div
      class="__result_oxford"
      @wheel.stop="handleMouseWheel"
      :class="{ '__result_oxford--expanded': expanded }"
      v-if="inDict && oxfordTranslations"
    >
      <div
        class="__result_class"
        v-for="(wordPos, i) in oxfordTranslations"
        :key="i"
      >
        <div
          class="__result_type __tooltip __right"
          :tooltip="abridge(wordPos.item.pos).meaning"
        >
          {{ abridge(wordPos.item.pos).abbr }}
        </div>
        <div class="__result_item-wrap">
          <div
            v-for="translation in wordPos.item.core"
            :key="translation.index"
            @mouseenter.stop="
              changeCurrentEnglishMeaning(translation.detail.zh)
            "
            @mouseleave.stop="changeCurrentEnglishMeaning('')"
            :class="{
              [`__result_item--${min_number_of_items_in_one_pos}`]: !expanded
            }"
            class="__result_item"
          >
            <div class="__result_english">
              {{ translation.detail.en | removeTag }}
            </div>
            <div class="__result_eg" v-if="translation.example">
              eg. {{ translation.example[0].en | removeTag }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 更多释义 -->
    <div
      v-if="hasMoreItem"
      @click.stop="toggleExpand"
      class="__result_more __tooltip __top"
      :tooltip="expanded ? '收起' : '显示更多英语释义'"
    >
      <div
        class="__result_more-button"
        :class="{ '__result_more-button--expanded': expanded }"
      ></div>
    </div>

    <!-- 简单中文翻译部分 -->
    <div class="__result_simple" v-if="inDict && !isOnlyOxford">
      <div
        class="__result_class"
        v-for="(translation, i) in usualTranslations"
        :key="i"
      >
        <div class="__result_type">{{ abridge(translation.pos).abbr }}</div>
        <div class="__result_item">
          {{ translation.values.join(' | ') | removeTag }}
        </div>
      </div>
    </div>
    <!--  -->
    <div class="__result_simple" v-else-if="!inDict">
      <div class="__result_item">
        <div class="__result_chinese __result_chinese--simple">
          {{ usualTranslations | removeTag }}
        </div>
      </div>
    </div>

    <div class="__result_footer">
      <div>
        <a
          v-if="inDict"
          :href="CGDICT_HOST + text"
          target="_blank"
          class="__result_ex-link"
          >点击查看词根词缀</a
        >
        <a
          :href="YOUGLISH_HOST + encode(text)"
          target="_blank"
          class="__result_ex-link"
          >从油管搜寻发音</a
        >

        <a
          v-if="sogouNeedVerificaiton"
          :href="SOGOU_HOST"
          target="_blank"
          class="__result_ex-link __is-error"
        >
          搜狗又需要验证啦，点击验证 (当前翻译由谷歌提供)
        </a>
      </div>

      <transition name="fade">
        <small v-if="error" class="__result_error">{{ error }}</small>
      </transition>

      <div class="__result_fonts-select">
        <div
          class="__result_font song"
          v-for="fontItem in fonts"
          :key="fontItem.label"
          :class="{ active: font === fontItem.value }"
          @click="changeFont(fontItem.value)"
        >
          {{ fontItem.label }}
        </div>
      </div>
    </div>

    <!-- 画中画 -->

    <translator-button
      :class="{ show: !panelVisible && selection }"
      :style="buttonPositionStyle"
      @click="panelVisible = true"
    />

    <transition name="fade-in">
      <result-panel
        v-if="resultPanelVisible"
        :text="selection"
        :style="panelPositionStyle"
        :result="translationResult"
        :hide="hidePanel"
      ></result-panel>
    </transition>
  </div>
</template>

<script>
import _merge from 'lodash-es/merge'
import WordModel from '@/model/word'
import TranslationModel from '@/model/translation'
import selectionMixin from '@/components/vue/selection-mixin'
import { _removeTag, _abridgePOS, _uuid } from '@/utils'
import {
  TR_SETTING_AUTO_SPEAK,
  TR_SETTING_FONT_FAMILY,
  TR_SETTING_SHANBAY,
  TR_SETTING_ONLY_OXFORD,
  TR_SETTING_YOUDAO,
  DADDA_ERRORS
} from '@/utils/constant'
import {
  SOUGOU_SPOKEN_URL,
  CGDICT_HOST,
  YOUGLISH_HOST,
  SOGOU_HOST
} from '@/api/host'

export default {
  name: 'result-panel',

  mixins: [selectionMixin],

  props: {
    hide: Function,

    result: Object,

    text: {
      type: String,
      default: ''
    },

    isDialog: {
      type: Boolean
    },
    inputVisible: {
      type: Boolean
    }
  },

  // ------------------------ 数 据 --------------------------------------------------------
  data() {
    return {
      SOGOU_HOST,

      uuid: '',
      oxfordEle: null,
      currentVocabulary: null,
      CGDICT_HOST,
      YOUGLISH_HOST,
      fonts: [
        { value: 'song', label: 'S' },
        { value: 'kai', label: 'K' },
        { value: 'hei', label: 'H' }
      ],
      font: 'song',

      expanded: false,
      currentEnglishMeaning: '',

      visible: false,
      inCollection: false,

      translationStructure: null,

      error: '',

      /** 对于有牛津英英释义的单词只显示牛津释义 */
      isOnlyOxford: false
    }
  },

  // ------------------------ 计 算 -------------------------------------------------------------
  computed: {
    sogouNeedVerificaiton() {
      return (
        this.result.translate.errorCode === DADDA_ERRORS.VERIFICATION_NEEDED
      )
    },
    /**
     * @summary 经过典型结构洗礼的结果
     */
    resultAfterFixed() {
      return _merge({}, this.translationStructure, this.result)
    },

    /**
     * @summary 是否有字典释义
     * 单个单词都具有字典释义
     * 句子、短语和单词的变化形态不具备（过去式...）
     */
    inDict() {
      return this.resultAfterFixed.isHasOxford
    },

    /**
     * @summary 在有牛津翻译的时候是否显示中文翻译
     */
    showCNResults() {
      return this.inDict && !this.isOnlyOxford
    },

    /**
     * @summary 短语
     * 单个单词才都具有短语
     */
    phrases() {
      return this.inDict ? this.dict.phrases : []
    },

    /**
     * @summary 释义
     * 如果具备字典释义则取字典释义，否则手动拼接
     */
    dict() {
      const cotentWhileNotInDict = {
        phonetic: `${SOUGOU_SPOKEN_URL}${this.text}`,
        content: [
          {
            item: {
              core: [
                {
                  example: [
                    {
                      en: 'no example.'
                    }
                  ]
                }
              ]
            }
          }
        ],
        usual: this.simpleTranslate
      }

      return this.inDict
        ? this.resultAfterFixed.dictionary.content[0]
        : cotentWhileNotInDict
    },

    /**
     * @summary 发音
     */
    phonetics() {
      return this.dict.phonetic
    },

    /**
     * @summary 牛津字典释义
     */
    oxfordTranslations() {
      return this.dict.content
    },

    /**
     * @summary 每个词性下开始最小显示的条目个数，并启用折叠，这个样的变量名大概会好看点
     */
    min_number_of_items_in_one_pos() {
      let posNumber = this.oxfordTranslations.length
      const map = {
        0: 3,
        1: 3,
        2: 1,
        3: 1
      }

      if (posNumber > 3) posNumber = 3

      return this.isDialog ? 999 : map[posNumber]
    },

    hasMoreItem() {
      return this.oxfordTranslations.some(pos => {
        return pos.item.core.length > this.min_number_of_items_in_one_pos
      })
    },

    /**
     * @summary 简单中文翻译
     */
    usualTranslations() {
      return this.dict.usual
    },

    /**
     * @summary 搜狗自己的翻译
     */
    simpleTranslate() {
      return this.resultAfterFixed.translate.dit || '无释义'
    }
  },

  // ------------------------ 监 听 -------------------------------------------------------------
  watch: {
    error(val) {
      if (val) {
        setTimeout(() => {
          this.error = ''
        }, 5000)
      }
    }
  },

  // ------------------------ 生 命 周 期 --------------------------------------------------------
  async created() {
    this.uuid = this.gengerateUUID()

    this.translationStructure = new TranslationModel()

    await this.refreshVocabulary()

    this.inCollection = this.currentVocabulary.some(
      wordObj => wordObj.t.toLowerCase() === this.text.toLowerCase()
    )

    this.isOnlyOxford = await this.$storage.get(TR_SETTING_ONLY_OXFORD, false)
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside, false)
    this.$nextTick(async _ => {
      this.font = await this.$storage.get(TR_SETTING_FONT_FAMILY, 'song')
      this.oxfordEle = this.$el.querySelector('.__result_oxford')
      this.visible = true

      const autoSpeak = await this.$storage.get(TR_SETTING_AUTO_SPEAK, false)
      if (autoSpeak) {
        if (this.inDict) {
          this.speak('uk')
        } else {
          const speaker = document.getElementById(`x__result-${this.uuid}`)
          speaker && speaker.play()
        }
      }
    })
  },

  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },

  // ------------------------ 组 件 方 法 --------------------------------------------------------
  methods: {
    async refreshVocabulary() {
      this.currentVocabulary = (await this.$vocabulary.get()) || []
    },

    abridge(pos) {
      return _abridgePOS(pos)
    },

    /**
     * @summary uuid 用来区分多结果卡片的情况下发音的重复
     */
    gengerateUUID() {
      return _uuid()
    },

    /**
     * @summary hover 英文释义的时候右上角出现对应中文释义
     */
    changeCurrentEnglishMeaning(meaning) {
      this.currentEnglishMeaning = meaning
    },

    /**
     * @summary 内部滚动不影响页面滚动
     */
    handleMouseWheel(e) {
      const { scrollTop, offsetHeight, scrollHeight } = this.oxfordEle
      const atTheBottom =
        scrollTop + offsetHeight >= scrollHeight && e.deltaY > 0
      const atTheTop = scrollTop <= 1 && e.deltaY < 0

      if (atTheBottom || atTheTop) {
        e.preventDefault()
      }
    },

    /**
     * @summary 如果具有更多释义默认折叠
     * 折叠规则见 compouted: min_number_of_items_in_one_pos
     */
    toggleExpand() {
      this.expanded = !this.expanded
    },

    /**
     * @summary 收藏 / 取消收藏
     */
    toggleCollect() {
      if (!this.inCollection) {
        this.addToVocabulary()
      } else {
        this.delWordInVocabulary()
      }
    },

    async addToVocabulary() {
      let {
        text: word,
        currentVocabulary,
        phonetics,
        simpleTranslate,
        $vocabulary,
        $storage
      } = this

      if (typeof phonetics === 'string') {
        phonetics = [
          {
            text: 'click to speak',
            type: 'uk',
            filename: phonetics.replace(/http(s?):/g, '')
          }
        ]
      }

      const wordObj = new WordModel({
        t: word,
        r: window.location.href,
        e: _removeTag(
          this.oxfordTranslations[0].item.core[0].example[0].en || ''
        ),
        p: JSON.stringify(phonetics)
      })

      if (await $vocabulary.has(word, currentVocabulary)) {
        return console.warn('[T & R]:', 'Already in vocabular!')
      }

      await $vocabulary.add(wordObj, currentVocabulary)

      await this.refreshVocabulary()

      this.inCollection = true

      const shouldAddToShanbay = await $storage.get(TR_SETTING_SHANBAY, false)
      const shouldAddToYoudao = await $storage.get(TR_SETTING_YOUDAO, false)

      if (shouldAddToShanbay) {
        chrome.runtime.sendMessage({ name: 'addToShanbay', word }, res => {
          if (res.status_code !== 0) {
            this.error = '扇贝词库同步失败，请稍后重试'
            console.warn('添加扇贝失败，请稍后重试')
          }
        })
      }

      if (shouldAddToYoudao) {
        chrome.runtime.sendMessage({ name: 'addToYoudao', word }, res => {
          if (!res) {
            this.error = '有道词库同步失败，请稍后重试'
            console.warn('添加有道失败，请稍后重试')
          }
        })
      }
    },

    async delWordInVocabulary() {
      const { text: word, currentVocabulary, $vocabulary } = this

      await $vocabulary.remove(word, currentVocabulary)

      await this.refreshVocabulary()

      this.inCollection = false
    },

    /**
     * @summary 点击收起
     */
    handleClickOutside(e) {
      e.stopPropagation()
      const clickInside = this.$el.contains(e.target)
      if (!clickInside) {
        this.hide && this.hide()
      }
    },

    /**
     * @summary 单词发音（仅单词
     */
    speak(type) {
      const audio = document.getElementById(`x__result_${type}-${this.uuid}`)
      if (!audio) return
      // 如果资源被 CSP 禁止，readyState 为 0
      if (audio.readyState === 4) {
        audio.play()
      } else {
        chrome.runtime.sendMessage({ name: 'speak', url: audio.src })
      }
    },

    async changeFont(font) {
      await this.$storage.set(TR_SETTING_FONT_FAMILY, font)
      this.font = font
    },

    encode(text) {
      return encodeURIComponent(text)
    }
  }
}
</script>

<template>
  <div class="__result" @mouseup.stop="onMouseDown" :class="{ '__result--invisible': !visible }">
    <!-- 头部 -->
    <div class="__result_origin">
      <div class="__result_word" :class="{ '__result_word--sentence': !inDict }">{{text}}</div>
      <div 
        class="__result_pronunciation __tooltip __top"
        tooltip="点击发音"
        v-if="inDict" 
        v-for="phonetic in phonetics" 
        :key="phonetic.filename" 
        @click="speak(phonetic.type)"
      >
        <div class="__result_flag" :class="`__result_flag--${phonetic.type}`"></div>
        <div class="__result_phonetic">[{{phonetic.text}}]</div>
        <audio 
          :id="`x__result_${phonetic.type}`" 
          class="__result_audio" 
          :src="`https:${phonetic.filename}`"
        ></audio>
      </div>

      <div class="__result_chinese">{{currentEnglishMeaning}}</div>

      <!-- 收藏 -->
      <div class="__result_star __tooltip __left" :tooltip="inCollection ? '从生词簿内删除' : '加入生词簿'" v-if="inDict" @click="toggleCollect">
        <i class="__icon" :class="[inCollection ? '__icon-star-solid' : '__icon-star']"></i>
      </div>
    </div>

    <!-- 牛津翻译部分 -->
    <div class="__result_oxford" :class="{'__result_oxford--expanded': expanded}"  v-if="inDict">
      <div class="__result_class" v-for="(wordPos, i) in oxfordTranslations" :key="i">
        <div 
          class="__result_type __tooltip __right" 
          :tooltip="posMap[wordPos.item.pos]"
        >{{posAbbrMap[wordPos.item.pos] || wordPos.item.pos}}</div>
        <div class="__result_item-wrap">
          <div class="__result_item" :class="{[`__result_item--${min_number_of_items_in_one_pos}`]: !expanded}" v-for="translation in wordPos.item.core" :key="translation.index">
            <div class="__result_english" @mouseenter.stop="changeCurrentEnglishMeaning(translation.detail.zh)" @mouseleave.stop="changeCurrentEnglishMeaning('')">{{translation.detail.en  | replaceTag}}</div>
            <div class="__result_eg" v-if="translation.example">eg. {{translation.example[0].en | replaceTag}}</div>
          </div>
        </div>
      </div>
    </div>
    <div @click.stop="toggleExpand" class="__result_more __tooltip __top" :tooltip="expanded ? '收起' : '显示更多英语释义'">
      <div 
        class="__result_more-button"
        :class="{'__result_more-button--expanded': expanded}" 
      ></div>
    </div>

    <!-- 简单中文翻译部分 -->
    <div class="__result_simple" v-if="inDict">
      <div class="__result_class" v-for="(translation, i) in usualTranslations" :key="i">
        <div class="__result_type">{{posAbbrMap[translation.pos]}}</div>
        <div class="__result_item">{{translation.values.join('')}}</div>
      </div>
    </div>
    <div class="__result_simple" v-else>
      <div class="__result_item">
        <div class="__result_chinese __result_chinese--simple">{{usualTranslations}}</div>
      </div>
    </div>

    <result-panel 
      v-if="resultPanelVisible" 
      @hide="translateLoaded = false" 
      :text="selection" 
      :style="positionStyle" 
      :result="translationResult"
    ></result-panel>
  </div>
</template>

<script>
import selectionMixin from '@/components/vue/selection-mixin'
import { SOUGOU_SPOKEN_URL } from '@/api/host'
import { POS_MAP, POS_ABBR_MAP } from '@/utils/constant'

export default {
  name: 'result-panel',

  mixins: [selectionMixin],

  props: {
    result: Object,

    text: {
      type: String,
      default: ''
    }
  },

  computed: {
    /**
     * @summary 是否有字典释义
     * 单个单词都具有字典释义
     * 句子、短语和单词的变化形态不具备（过去式...）
     */
    inDict() {
      return this.result.isHasOxford
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
        phonetic: [`${SOUGOU_SPOKEN_URL}${this.text}`],
        content: [],
        usual: this.result.translate.dit
      }
      return this.inDict ? this.result.dictionary.content[0] : cotentWhileNotInDict
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
     * @summary 每个词性下开始最小显示的条目个数，这个样的变量名大概会好看点
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

      return map[posNumber]
    },

    /**
     * @summary 简单中文翻译
     */
    usualTranslations() {
      return this.dict.usual
    }
  },

  data() {
    return {
      expanded: false,
      posMap: POS_MAP,
      currentEnglishMeaning: '',
      posAbbrMap: POS_ABBR_MAP,

      visible: false,
      inCollection: false
    }
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
    this.$nextTick(_ => {
      this.visible = true
    })
  },

  beforeDestory() {
    document.removeEventListener('click', this.handleClickOutside)
  },

  methods: {
    changeCurrentEnglishMeaning(meaning) {
      this.currentEnglishMeaning = meaning
    },

    toggleExpand() {
      this.expanded = !this.expanded
    },

    toggleCollect() {},

    handleClickOutside(e) {
      e.stopPropagation()
      const clickInside = this.$el.contains(e.target)
      if (!clickInside) {
        this.$emit('hide')
      }
    },

    speak(type) {
      const audio = document.getElementById(`x__result_${type}`)
      audio && audio.play()
    }
  }
}
</script>


<template>
  <div class="Tetrapod">
    <h2 class="title">Tetrapod Test Module</h2>
    <div class="tab-menu">
      <div class="tab-title tab-menu-1 selected" @click="tabShow(1)">비속어/정상단어목록</div>
      <div class="tab-title tab-menu-2" @click="tabShow(2)">비속어 필터</div>
    </div>
    <div class="tab-contents">
      <div class="tab-contents-1 selected">
        <h3 class="tab-contents-1-title">비속어 목록</h3>
        <textarea class="tab-contents-1-text bad-words" v-model="badWordsList" readonly></textarea>
        <h3 class="tab-contents-1-title">저속한 단어 목록</h3>
        <textarea class="tab-contents-1-text vulgar-words" v-model="vulgarWordsList" readonly></textarea>
        <h3 class="tab-contents-1-title">정상단어 목록</h3>
        <textarea class="tab-contents-1-text normal-words" v-model="normalWordsList" readonly></textarea>
        <h3 class="tab-contents-1-title">비속어 매크로 목록</h3>
        <textarea class="tab-contents-1-text normal-words" v-model="macrosList" readonly></textarea>
        <div class="tab-contents-buttons">
          <button class="load-button" @click="recall">불러오기</button>
        </div>
      </div>
      <div class="tab-contents-2">
        <h3 class="tab-contents-2-title">비속어 확인할 문장</h3>
        <div class="button-wrap">
          <input id="bad-word-check" v-model="inputSentence" />
          <button class="result-button" @click="operation">비속어 확인 결과</button>
        </div>
        <h3 class="tab-contents-2-title">비속어 필터링</h3>
        <div class="tab-contents-2-text bad-word-search">{{filteredSentence}}</div>
        <h3 class="tab-contents-2-title">비속어 조회 결과</h3>
        <div class="tab-contents-2-text bad-word-search">{{badWordResult}}</div>
      </div>
    </div>
  </div>

</template>

<script>
// import fs from 'fs';
import Tetrapod from './tetrapod.js';
import badWords from '../assets/dictionaries/bad-words.json';
import macros from '../assets/dictionaries/macros.json';
import normalWords from '../assets/dictionaries/normal-words.json';
import vulgarWords from '../assets/dictionaries/soft-search-words.json';

export default {
  name: "TetraPod",
  components:{

  },
  data: function() {
    return {
      badWordsList: '',
      vulgarWordsList: '',
      normalWordsList: '',
      macrosList: '',
      inputSentence:'',
      badWordResult: '',
      filteredSentence: ''
    }
  },
  props: {
  },
  methods: {
    tabShow(e) {
      switch(e) {
        case 1:
          document.querySelector('div.tab-menu-1').classList.add('selected');
          document.querySelector('div.tab-contents-1').classList.add('selected');
          document.querySelector('div.tab-menu-2').classList.remove('selected');
          document.querySelector('div.tab-contents-2').classList.remove('selected');
          break;
        case 2:
          document.querySelector('div.tab-menu-1').classList.remove('selected');
          document.querySelector('div.tab-contents-1').classList.remove('selected');
          document.querySelector('div.tab-menu-2').classList.add('selected');
          document.querySelector('div.tab-contents-2').classList.add('selected');
          break;
      }
    },
    // 비속어 필터 작동
    operation() {
      console.log(this.inputSentence);
      let exp = {drug: [], insult:[], sexuality:[], violence:[]}
      Tetrapod.load(badWords.badwords, normalWords.dictionary, vulgarWords.badwords, normalWords.exception, exp, macros );
      this.filteredSentence = Tetrapod.fix(this.inputSentence, '*');
      this.badWordResult = Tetrapod.find(this.inputSentence, true);
    },
    // 데이터 불러오기
    recall() {
      console.log('RECALL');
      this.badWordsList = JSON.stringify(badWords);
      this.normalWordsList = JSON.stringify(normalWords);
      this.vulgarWordsList = JSON.stringify(vulgarWords);
      this.macrosList = JSON.stringify(macros);
    }
  }
}
</script>

<style lang="scss">
.Tetrapod {
  .title {
    font-size: 2em;
  }
  .tab-menu {
    display:flex;
    width: 60vw;
    margin-left: 20vw;
    margin-bottom: 5vw;
    justify-content: space-evenly;

    .tab-title {
      cursor: pointer;
      border: 1px solid grey;
      padding: 3px;
      width: 29vw;
      &.selected {
        font-weight: bold;
        background-color: yellow;
      }
    }
  }
  .tab-contents {
    width: 90vw;
    margin-left: 5vw;
    border: 1px solid grey;

    &-1, &-2 {
      display:none;
      &.selected {
        display:block;
      }
    }
    &-1 {
      padding-bottom: 5vw;
      textarea {
        width: 80vw;
        height: 15em;
      }
      .tab-contents-buttons {
        padding-top: 20px;
      }
    }

    &-2 {
      padding: 20px 5px;
      input {
        width: 80vw;
      }
      .button-wrap {
        padding-top: 5px;
        padding-bottom: 5px;
      }
    }

  }
}
</style>

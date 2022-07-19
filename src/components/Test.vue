<template>
  <div class="Tetrapod">
    <h2 class="title">Tetrapod Test Module</h2>
    <div class="tab-menu">
      <div class="tab-title tab-menu-1 selected" @click="tabShow(1)">비속어/정상단어목록</div>
      <div class="tab-title tab-menu-2" @click="tabShow(2)">한영변환 테스트</div>
      <div class="tab-title tab-menu-3" @click="tabShow(3)">비속어 필터</div>
    </div>
    <div class="tab-contents">
      <div class="tab-contents-1 selected">
        <h3 class="tab-contents-1-title">비속어 목록</h3>
        <textarea class="tab-contents-1-text bad-words" v-model="data.badWordsList" readonly></textarea>
        <h3 class="tab-contents-1-title">정상단어 목록</h3>
        <textarea class="tab-contents-1-text normal-words" v-model="data.normalWordsList" readonly></textarea>
        <h3 class="tab-contents-1-title">비속어 매크로 목록</h3>
        <textarea class="tab-contents-1-text normal-words" v-model="data.macrosList" readonly></textarea>
        <div class="tab-contents-buttons">
          <button class="load-button" @click="recall">불러오기</button>
        </div>
      </div>
      <div class="tab-contents-2">
        <h3 class="tab-contents-2-title">QWERTY 키보드 한글 낱자 변환</h3>
        <div class="button-wrap">
          <input id="qwerty-sentence" v-model="data.qwertySentence" />
          <button class="result-button" @click="converting(1)">변환하기</button>
        </div>
        <h3 class="tab-contents-2-title">변환 결과</h3>
        <div class="tab-contents-2-text bad-word-search">{{data.qwertyResult}}</div>

        <h3 class="tab-contents-2-title">키보드 유사자모 변환</h3>
        <div class="button-wrap">
          <input id="antispoof-sentence" v-model="data.antispoofSentence" />
          <button class="result-button" @click="converting(2)">변환하기</button>
        </div>
        <h3 class="tab-contents-2-title">변환 결과</h3>
        <div class="tab-contents-2-text bad-word-search">{{data.antispoofResult}}</div>

        <h3 class="tab-contents-2-title">영자발음 한영 전환</h3>
        <div class="button-wrap">
          <input id="pronounce-sentence" v-model="data.pronounceSentence" />
          <button class="result-button" @click="converting(3)">변환하기</button>
        </div>
        <h3 class="tab-contents-2-title">변환 결과</h3>
        <div class="tab-contents-2-text bad-word-search">{{data.pronounceResult}}</div>

        <h3 class="tab-contents-2-title">장황한 음 줄이기</h3>
        <div class="button-wrap">
          <input id="drop-double-sentence" v-model="data.dropDoubleSentence" />
          <button class="result-button" @click="converting(4)">변환하기</button>
        </div>
        <h3 class="tab-contents-2-title">변환 결과</h3>
        <div class="tab-contents-2-text bad-word-search">{{data.dropDoubleResult}}</div>

      </div>
      <div class="tab-contents-3">
        <h3 class="tab-contents-3-title">비속어 체크 옵션</h3>
        <input type="checkbox" id="qwerty-option" name="qwerty" @click="changeOptions"/>
        <label for="qwerty-option">한영자 자판 변환 체크</label>
        <input type="checkbox" id="antispoof-option" name="antispoof" @click="changeOptions"/>
        <label for="antispoof-option">유사자모 변환 체크</label>
        <input type="checkbox" id="pronounce-option" name="pronounce" @click="changeOptions"/>
        <label for="pronounce-option">영문자 한글로 발음 변환해 체크</label>
        <input type="checkbox" id="drop-double-option" name="dropDouble" @click="changeOptions"/>
        <label for="drop-double-option">중복어구 단축해서 체크</label>
        <h3 class="tab-contents-3-title">비속어 확인할 문장</h3>
        <div class="button-wrap">
          <input id="bad-word-check" v-model="data.inputSentence" />
          <button class="result-button" @click="operation">비속어 확인 결과</button>
        </div>
        <h3 class="tab-contents-3-title">비속어 필터링</h3>
        <div class="tab-contents-3-text bad-word-search">{{data.filteredSentence}}</div>
        <h3 class="tab-contents-3-title">비속어 조회 결과</h3>
        <div class="tab-contents-3-text bad-word-search">{{data.badWordResult}}</div>
      </div>
    </div>
  </div>

</template>

<script>
import {reactive} from 'vue';
import Tetrapod from './tetrapod.js';
import badWords from '../assets/dictionaries/bad-words.json';
import macros from '../assets/dictionaries/macros.json';
import normalWords from '../assets/dictionaries/normal-words.json';

export default {
  name: "TetraPod",
  components:{

  },
  // data: function() {
  //   return {
  //     badWordsList: '',
  //     normalWordsList: '',
  //     macrosList: '',
  //     inputSentence:'',
  //     badWordResult: '',
  //     filteredSentence: ''
  //   }
  // },
  props: {
  },
  setup(props) {
    console.log(props);
    let obj = new Tetrapod();
    const data = reactive({
      badWordsList: '',
      normalWordsList: '',
      macrosList: '',
      inputSentence:'',
      badWordResult: '',
      filteredSentence: '',
      qwertySentence: '', // 영자키 섞기 -> 변환
      qwertyResult: '',
      antispoofSentence:'', // 유사자모 혼동 방지
      antispoofResult: '',
      pronounceSentence: '', // 영어 알파벳 발음 한글로
      pronounceResult: '',
      dropDoubleSentence: '', // 중언부언할 표현 줄이기
      dropDoubleResult: '',
    });

    obj.load({originalBadWordsData: badWords, originalNormalWordsData: normalWords, badWordMacros: macros }, true);

    // 데이터 불러오기
    const recall = () => {
      console.log('RECALL');
      data.badWordsList = JSON.stringify(obj.originalBadWordsData);
      data.normalWordsList = JSON.stringify(obj.originalNormalWordsData);
      data.macrosList = JSON.stringify(obj.badWordMacros);
    }

    // 비속어 필터 작동
    const operation= () => {
      console.log(data.inputSentence);
      data.filteredSentence = obj.fix(data.inputSentence, '*');
      data.badWordResult = JSON.stringify(obj.find(data.inputSentence, true));
    }

    // 탭 보였다 감추기
    const tabShow = (e)=> {
      switch(e) {
        case 1:
        {
          let obj1 = document.querySelectorAll('div.tab-menu-1, div.tab-contents-1');
          obj1.forEach(x=> x.classList.add('selected'));
          let obj2 = document.querySelectorAll('div.tab-menu-2, div.tab-contents-2, div.tab-menu-3, div.tab-contents-3');
          obj2.forEach(x=> x.classList.remove('selected'));
          break;
        }
        case 2: {
          let obj1 = document.querySelectorAll('div.tab-menu-2, div.tab-contents-2');
          obj1.forEach(x=> x.classList.add('selected'));
          let obj2 = document.querySelectorAll('div.tab-menu-1, div.tab-contents-1, div.tab-menu-3, div.tab-contents-3');
          obj2.forEach(x=> x.classList.remove('selected'));
          break;
        }
        case 3: {
          let obj1 = document.querySelectorAll('div.tab-menu-3, div.tab-contents-3');
          obj1.forEach(x=> x.classList.add('selected'));
          let obj2 = document.querySelectorAll('div.tab-menu-1, div.tab-contents-1, div.tab-menu-2, div.tab-contents-2');
          obj2.forEach(x=> x.classList.remove('selected'));
          break;
        }
      }
    };

    const changeOptions = () => {
      let qwertyChecked = document.querySelector('#qwerty-option').checked;
      let antispoofChecked = document.querySelector('#antispoof-option').checked;
      let pronounceChecked = document.querySelector('#pronounce-option').checked;
      let dropDoubleChecked = document.querySelector('#drop-double-option').checked;
      let engOpt = []
      if (qwertyChecked) engOpt.push('qwerty');
      if (antispoofChecked) engOpt.push('antispoof');
      if (pronounceChecked) engOpt.push('pronounce');
      obj.adjustFilter([], [], engOpt, dropDoubleChecked);
    }

    const converting = (e) => {
      switch(e) {
        //qwerty
        case 1: {
          data.qwertyResult = Tetrapod.qwertyToDubeol(data.qwertySentence);
          break;
        }
        case 2: {
          data.antispoofResult = Tetrapod.antispoof(data.antispoofResult);
          break;
        }
        case 3: {
          data.pronounceResult = Tetrapod.engToKo(data.pronounceResult);
          break;
        }
        case 4: {
          data.dropDoubleResult = Tetrapod.dropDouble(data.dropDoubleResult);
          break;
        }
      }
    }

    return {
      data,
      tabShow,
      recall,
      operation,
      converting,
      changeOptions
    };
  },
  methods: {
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

    &-1, &-2, &-3 {
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

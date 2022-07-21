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
        <div class="tab-contents-1-box">
          <h3 class="tab-contents-1-title">비속어 데이터</h3>
          <textarea class="tab-contents-1-text bad-words" v-model="data.parsedBadWordsList" readonly></textarea>
        </div>
        <div class="tab-contents-1-box">
          <h3 class="tab-contents-1-title">비속어 원본</h3>
          <textarea class="tab-contents-1-text bad-words" v-model="data.badWordsList"></textarea>
        </div>
        <div class="tab-contents-1-box">
          <h3 class="tab-contents-1-title">정상단어 목록</h3>
          <textarea class="tab-contents-1-text normal-words" v-model="data.normalWordsList" readonly></textarea>
        </div>
        <div class="tab-contents-1-box">
          <h3 class="tab-contents-1-title">비속어 매크로 목록</h3>
          <textarea class="tab-contents-1-text normal-words" v-model="data.macrosList" readonly></textarea>
        </div>
        <div class="tab-contents-buttons">
          <button class="load-button" @click="recall">불러오기</button>
          <button class="modify-button" @click="modify">수정하기</button>
        </div>
      </div>
      <div class="tab-contents-2">
        <div class="tab-contents-2-box">
          <h3 class="tab-contents-2-title">QWERTY 키보드 한글 낱자 변환</h3>
          <div class="button-wrap">
            <input id="qwerty-sentence" v-model="data.qwertySentence" />
            <input type="checkbox" id="qwerty-sentence-option" name="qwerty-sentence-check" @click="changeConvertingOptions"/>
            <label for="qwerty-sentence-option">낱자단위 변환과정 보기</label>
            <button class="result-button" @click="converting(1)">변환하기</button>
          </div>
          <h3 class="tab-contents-2-title">변환 결과</h3>
          <!-- convertingOption.qwerty가 거짓이면 문장만 출력, 참이면 낱자 리스트를 포함한 표를 출력 -->
          <div v-if="typeof data.qwertyResult=== 'string'" class="tab-contents-2-text converted-sentence">{{data.qwertyResult}}</div>
          <div v-if="typeof data.qwertyResult=== 'object'" class="tab-contents-2-text converted-sentence">
            <table class="result-table">
              <tr>
                <td v-for="(word, idx) in data.qwertyResult.messageList" :key="`${idx}-qo`">{{word}}</td>
              </tr>
              <tr>
                <td v-for="(word1, idx1) in data.qwertyResult.parsedMessage" :key="`${idx1}-qor`">{{word1}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="tab-contents-2-box">
          <h3 class="tab-contents-2-title">키보드 유사자모 변환</h3>
          <div class="button-wrap">
            <input id="antispoof-sentence" v-model="data.antispoofSentence" />
            <input type="checkbox" id="antispoof-sentence-option" name="antispoof-sentence-check" @click="changeConvertingOptions"/>
            <label for="antispoof-sentence-option">낱자단위 변환과정 보기</label>
            <button class="result-button" @click="converting(2)">변환하기</button>
          </div>
          <h3 class="tab-contents-2-title">변환 결과</h3>
          <!-- convertingOption.antispoof가 거짓이면 문장만 출력, 참이면 낱자 리스트를 포함한 표를 출력 -->
          <div v-if="typeof data.antispoofResult ==='string'" class="tab-contents-2-text converted-sentence">{{data.antispoofResult}}</div>
          <div v-if="typeof data.antispoofResult === 'object'" class="tab-contents-2-text converted-sentence">
            <table class="result-table">
              <tr>
                <td v-for="(word, idx) in data.antispoofResult.messageList" :key="`${idx}-ao`">{{word}}</td>
              </tr>
              <tr>
                <td v-for="(word1, idx1) in data.antispoofResult.parsedMessage" :key="`${idx1}-aor`">{{word1}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="tab-contents-2-box">
          <h3 class="tab-contents-2-title">영자발음 한영 전환</h3>
          <div class="button-wrap">
            <input id="pronounce-sentence" v-model="data.pronounceSentence" />
            <input type="checkbox" id="pronounce-sentence-option" name="pronounce-sentence-check" @click="changeConvertingOptions"/>
            <label for="pronounce-sentence-option">낱자단위 변환과정 보기</label>
            <button class="result-button" @click="converting(3)">변환하기</button>
          </div>
          <h3 class="tab-contents-2-title">변환 결과</h3>
          <!-- convertingOption.pronounce가 거짓이면 문장만 출력, 참이면 낱자 리스트를 포함한 표를 출력 -->
          <div v-if="typeof data.pronounceResult ==='string'" class="tab-contents-2-text converted-sentence">{{data.pronounceResult}}</div>
          <div v-if="typeof data.pronounceResult === 'object'" class="tab-contents-2-text converted-sentence">
            <table class="result-table">
              <tr>
                <td v-for="(word, idx) in data.pronounceResult.messageList" :key="`${idx}-po`">{{word}}</td>
              </tr>
              <tr>
                <td v-for="(word1, idx1) in data.pronounceResult.parsedMessage" :key="`${idx1}-por`">{{word1}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="tab-contents-2-box">
          <h3 class="tab-contents-2-title">장황한 음 줄이기</h3>
          <div class="button-wrap">
            <input id="drop-double-sentence" v-model="data.dropDoubleSentence" />
            <input type="checkbox" id="drop-double-sentence-option" name="drop-double-sentence-check" @click="changeConvertingOptions"/>
            <label for="pronounce-sentence-option">낱자단위 변환과정 보기</label>
            <input type="checkbox" id="drop-double-sentence-simplify" name="drop-double-sentence-simplify" @click="changeConvertingOptions"/>
            <label for="pronounce-sentence-option">음정 단순화</label>
            <button class="result-button" @click="converting(4)">변환하기</button>
          </div>
          <h3 class="tab-contents-2-title">변환 결과</h3>
          <!-- convertingOption.dropDouble이 거짓이면 문장만 출력, 참이면 낱자 리스트를 포함한 표를 출력 -->
          <div v-if="typeof data.dropDoubleResult ==='string'" class="tab-contents-2-text converted-sentence">{{data.dropDoubleResult}}</div>
          <div v-if="typeof data.dropDoubleResult === 'object'" class="tab-contents-2-text converted-sentence">
            <table class="result-table">
              <tr>
                <td v-for="(word, idx) in data.dropDoubleResult.messageList" :key="`${idx}-do`">{{word}}</td>
              </tr>
              <tr>
                <td v-for="(word1, idx1) in data.dropDoubleResult.parsedMessage" :key="`${idx1}-dor`">{{word1}}</td>
              </tr>
            </table>
          </div>
        </div>
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
  props: {
  },
  setup(props) {
    console.log(props);
    let obj = new Tetrapod();
    const data = reactive({
      badWordsList: '',
      normalWordsList: '',
      macrosList: '',
      parsedBadWordsList: '',
      inputSentence:'',
      badWordResult: '',
      filteredSentence: '',
      qwertySentence: '', // 영자키 섞기 -> 변환
      qwertyResult: '', // 영자키 섞기 결과
      antispoofSentence:'', // 유사자모 혼동 방지
      antispoofResult: '', // 유사자모 혼동 결과
      pronounceSentence: '', // 영어 알파벳 발음 한글로
      pronounceResult: '', // 한영발음 변환 결과
      dropDoubleSentence: '', // 중언부언할 표현 줄이기
      dropDoubleResult: '', // 중언부언 변환 결과
      convertingOption: {qwerty: false, antispoof: false, pronounce: false, dropDouble: false, simplify: false} // 문장 옵션 확인하기

    });

    obj.load({originalBadWordsData: badWords, originalNormalWordsData: normalWords, badWordMacros: macros }, true);

    // 데이터 불러오기
    const recall = () => {
      console.log('RECALL');
      data.badWordsList = JSON.stringify(obj.originalBadWordsData, null, 2);
      data.normalWordsList = JSON.stringify(obj.originalNormalWordsData, null, 2);
      data.macrosList = JSON.stringify(obj.badWordMacros, null, 2);
      let parsedData = obj.getLoadedData().badWords;
      data.parsedBadWordsList = JSON.stringify(parsedData, null, 2);
    }

    // 데이터 수정하기
    const modify = () => {
      console.log('MODIFY');
      try {
          let newBadWordsData = JSON.parse(data.badWordsList);
          let newNormalWordsData = JSON.parse(data.normalWordsList);
          let newMacroData = JSON.parse(data.macrosList);
          let saveData = confirm("데이터 저장하시겠습니까?");
          if (saveData) {
               obj.load({originalBadWordsData: newBadWordsData, originalNormalWordsData: newNormalWordsData, badWordMacros: newMacroData}, true);
               data.parsedBadWordsList = '';
               alert("저장되었습니다!!!");
          }
      }
      catch(e) {
         alert("데이터 파싱이 되지 않습니다!");
      }
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

    // 변환 문장 탭
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

    // 문장 변환
    const converting = (e) => {
      switch(e) {
        //qwerty
        case 1: {
          // 참이면 낱자 정보가 포함된 리스트 출력, 거짓이면 변환된 문장만 출력
          data.qwertyResult = Tetrapod.qwertyToDubeol(data.qwertySentence, data.convertingOption.qwerty);
          break;
        }
        case 2: {
          // 참이면 낱자 정보가 포함된 리스트 출력, 거짓이면 변환된 문장만 출력
          data.antispoofResult = Tetrapod.antispoof(data.antispoofSentence, data.convertingOption.antispoof);
          break;
        }
        case 3: {
          // 참이면 낱자 정보가 포함된 리스트 출력, 거짓이면 변환된 문장만 출력
          data.pronounceResult = Tetrapod.engToKo(data.pronounceSentence, data.convertingOption.pronounce);
          break;
        }
        case 4: {
          // 참이면 낱자 정보가 포함된 리스트 출력, 거짓이면 변환된 문장만 출력
          data.dropDoubleResult = Tetrapod.dropDouble(data.dropDoubleSentence, data.convertingOption.dropDouble, data.convertingOption.simplify);
          break;
        }
      }
    }

    //문장 변환 옵션 추가
    const changeConvertingOptions = () => {
      data.convertingOption.qwerty = document.querySelector('#qwerty-sentence-option').checked;
      data.convertingOption.antispoof = document.querySelector('#antispoof-sentence-option').checked;
      data.convertingOption.pronounce = document.querySelector('#pronounce-sentence-option').checked;
      data.convertingOption.dropDouble = document.querySelector('#drop-double-sentence-option').checked;
      data.convertingOption.simplify = document.querySelector('#drop-double-sentence-simplify').checked;
    }

    return {
      data,
      tabShow,
      recall,
      modify,
      operation,
      converting,
      changeOptions,
      changeConvertingOptions
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
      align: left;
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
      &-box {
        margin: 5px 5px 20px 5px;
        padding: 10px;
        border: 1px solid #eeeeee;
        background: #ffffd8;
      }
      .bad-word-search {
        border: 1px dashed #eeeeee;
        padding: 3px;
        min-height: 30px;
        background: #f1f8d5;
      }
      input[id*="sentence"] {
        max-width: 600px;
      }
      input[id$="option"], input[id$="simplify"] {
        width: 2em;
      }
      label {
        margin-right: 1em;
      }
      table.result-table {
        border-collapse:collapse;
        border: 1px solid #cccccc;
        margin-left: auto; margin-right:auto;
        td {
          border: 1px solid #dddddd;
          padding-left: 0.3em;
          padding-right: 0.3em;
        }
      }
    }

  }
}
</style>

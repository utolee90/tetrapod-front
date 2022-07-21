<template>
  <div :class="['tab-contents-2']">
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
</template>

<script>
import {reactive} from 'vue';
import Tetrapod from './tetrapod.js';

export default {
  name: "ConvertA",
  props: {

  },
  setup() {
    const data = reactive({
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
      converting,
      changeConvertingOptions
    }

  }
}
</script>

<style lang="scss">
.tab-contents-2 {
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
  input[type="checkbox"] {
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
</style>

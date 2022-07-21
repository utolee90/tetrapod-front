<template>
  <div class="tab-contents-3">
    <h3 class="tab-contents-3-title">비속어 체크 옵션</h3>
    <div class="tab-contents-3-box">
      <h4 class="tab-contents-3-subtitle">추가로 잡아낼 비속어 유형</h4>
      <div class="tab-contents-3-flex">
        <input type="checkbox" id="level-1-option" name="level-1" @click="changeOptions"/>
        <label for="level-1-option">1</label>
        <input type="checkbox" id="level-2-option" name="level-2" @click="changeOptions"/>
        <label for="level-2-option">2</label>
        <input type="checkbox" id="level-3-option" name="level-3" @click="changeOptions"/>
        <label for="level-3-option">3</label>
        <input type="checkbox" id="level-4-option" name="level-4" @click="changeOptions"/>
        <label for="level-4-option">4</label>
      </div>
    </div>
    <div class="tab-contents-3-box">
      <h4 class="tab-contents-3-subtitle">표시할 비속어 유형</h4>
      <div class="tab-contents-3-flex">
        <input type="checkbox" id="kind-drug-option" name="level-1" @click="changeOptions"/>
        <label for="kind-drug-option">약물</label>
        <input type="checkbox" id="kind-insult-option" name="level-2" @click="changeOptions"/>
        <label for="kind-insult-option">모욕적 표현</label>
        <input type="checkbox" id="kind-sexuality-option" name="level-3" @click="changeOptions"/>
        <label for="kind-sexuality-option">성적 표현</label>
        <input type="checkbox" id="kind-violence-option" name="level-4" @click="changeOptions"/>
        <label for="kind-violence-option">폭력적 표현</label>
      </div>
    </div>
    <div class="tab-contents-3-box">
      <h4 class="tab-contents-3-subtitle">변환 후에 잡아낼 옵션</h4>
      <div class="tab-contents-3-flex">
        <input type="checkbox" id="qwerty-option" name="qwerty" @click="changeOptions"/>
        <label for="qwerty-option">한영자 자판 변환 체크</label>
        <input type="checkbox" id="antispoof-option" name="antispoof" @click="changeOptions"/>
        <label for="antispoof-option">유사자모 변환 체크</label>
        <input type="checkbox" id="pronounce-option" name="pronounce" @click="changeOptions"/>
        <label for="pronounce-option">영문자 한글로 발음 변환해 체크</label>
        <input type="checkbox" id="drop-double-option" name="dropDouble" @click="changeOptions"/>
        <label for="drop-double-option">중복어구 단축해서 체크</label>
      </div>
    </div>
    <h3 class="tab-contents-3-title">비속어 확인할 문장</h3>
    <div class="button-wrap">
      <div class="tab-contents-3-flex">
        <input type="radio" id="10-check" name="divide" value="10"/>
        <label for="10-check">신속 검사</label>
        <input type="radio" id="20-check" name="divide" value="20" checked/>
        <label for="20-check">넓게 검사</label>
        <input type="radio" id="0-check" name="divide" value="0"/>
        <label for="0-check">문장 나누지 않고 검사</label>
      </div>
      <input id="bad-word-check" v-model="data.inputSentence" />
      <button class="result-button" @click="checkSentence" >비속어 확인</button>
      <button class="reset-button" @click="reset" >초기화</button>
    </div>
    <h3 class="tab-contents-3-title">비속어 필터링</h3>
    <div class="tab-contents-3-text bad-word-search">{{data.filteredSentence}}</div>
    <h3 class="tab-contents-3-title">비속어 조회 결과</h3>
    <div class="tab-contents-3-text bad-word-search">
      <div class='badWords-discovered' v-for="(val, idx) in data.badWordResult.found" :key="`${idx}-result`">
        발견한 비속어: {{val}}, 찾은 위치: {{data.badWordResult.positions[idx]}} ({{data.badWordResult.kind[idx]}})
      </div>
    </div>
  </div>
</template>

<script>
import {reactive} from 'vue';

export default {
  name: "FilterA",
  props: {
    badWordFilter: Function, // 원래 Test.vue에서 가져옴
    changeOptions: Function // Test.vue에서 가져옴
  },
  setup(props) {

    const data = reactive({
      inputSentence:'',
      // 독자 유형으로 재정리하자
      badWordResult: {
        found: [], positions:[], kind: []
      },
      filteredSentence: '',
      isLoading: false, // 검색 시간이 오래 걸리므로 검색시간 도중에는 버튼 비활성화시키게 처리
    });

    const checkSentence = () => {
      const splitValues = document.querySelectorAll('input[name="divide"]');
      let splitValue=20;
      for (let x of splitValues) {
        if (x.checked) splitValue = Number(x.value); break;
      }
      console.log(splitValue, '결과');
      // 작업 중에는 버튼 임시적으로 비활성화
      document.querySelector('.result-button').disabled = true;
      document.querySelector('.result-button').classList.add('disabled');
      document.querySelector('.reset-button').disabled = true;
      document.querySelector('.reset-button').classList.add('disabled');
      const res = props.badWordFilter(data.inputSentence, splitValue);
      data.filteredSentence = res.fixed;
      console.log(res.findBadWords);
      // findBadWords를 res.findBadWord를 이용해서 정의한다.
      if (Array.isArray(res.findBadWords.found)) {
        for (var idx in res.findBadWords.found) {
          data.badWordResult.found.push(res.findBadWords.found[idx]);
          data.badWordResult.positions.push(JSON.stringify(res.findBadWords.positions[idx]));
          data.badWordResult.kind.push('원본');
        }
      }
      if (Array.isArray(res.findBadWords.ddFound)) {
        for (idx in res.findBadWords.ddFound) {
          data.badWordResult.found.push(res.findBadWords.ddFound[idx]);
          data.badWordResult.positions.push(JSON.stringify(res.findBadWords.ddPositions[idx]));
          data.badWordResult.kind.push('한글 축약');
        }
      }
      if (Array.isArray(res.findBadWords.ddsFound)) {
        for (idx in res.findBadWords.ddsFound) {
          data.badWordResult.found.push(res.findBadWords.ddsFound[idx]);
          data.badWordResult.positions.push(JSON.stringify(res.findBadWords.ddsPositions[idx]));
          data.badWordResult.kind.push('한글 축약 후 평음화');
        }
      }
      if (Array.isArray(res.findBadWords.doubleEnd)) {
        for (idx in res.findBadWords.doubleEnd) {
          data.badWordResult.found.push(res.findBadWords.doubleEnd[idx]);
          data.badWordResult.positions.push(res.findBadWords.doubleEndPositions[idx]);
          data.badWordResult.kind.push('부적절 겹받침');
        }
      }
      if (Array.isArray(res.findBadWords.qwertyFound)) {
        for (idx in res.findBadWords.qwertyFound) {
          data.badWordResult.found.push(res.findBadWords.qwertyFound[idx]);
          data.badWordResult.positions.push(JSON.stringify(res.findBadWords.qwertyPositions[idx]));
          data.badWordResult.kind.push('한영자판 바꾸기');
        }
      }
      if (Array.isArray(res.findBadWords.qwertyDdFound)) {
        for (idx in res.findBadWords.qwertyDdFound) {
          data.badWordResult.found.push(res.findBadWords.qwertyDdFound[idx]);
          data.badWordResult.positions.push(JSON.stringify(res.findBadWords.qwertyDdPositions[idx]));
          data.badWordResult.kind.push('한영자판 바꾸기 후 한글 축약');
        }
      }
      if (Array.isArray(res.findBadWords.qwertyDdsFound)) {
        for (idx in res.findBadWords.qwertyDdsFound) {
          data.badWordResult.found.push(res.findBadWords.qwertyDdsFound[idx]);
          data.badWordResult.positions.push(JSON.stringify(res.findBadWords.qwertyDdsPositions[idx]));
          data.badWordResult.kind.push('한영자판 바꾸기 후 한글 축약 후 평음화');
        }
      }
      if (Array.isArray(res.findBadWords.qwertyDoubleEnd)) {
        for (idx in res.findBadWords.qwertyDoubleEnd) {
          data.badWordResult.found.push(res.findBadWords.qwertyDoubleEnd[idx]);
          data.badWordResult.positions.push(res.findBadWords.qwertyDoubleEndPositions[idx]);
          data.badWordResult.kind.push('한영자판 바꾸기 후 부적절 겹받침');
        }
      }
      if (Array.isArray(res.findBadWords.antispoofFound)) {
        for (idx in res.findBadWords.antispoofFound) {
          data.badWordResult.found.push(res.findBadWords.antispoofFound[idx]);
          data.badWordResult.positions.push(JSON.stringify(res.findBadWords.antispoofPositions[idx]));
          data.badWordResult.kind.push('유사자모 변환');
        }
      }
      if (Array.isArray(res.findBadWords.antispoofDdFound)) {
        for (idx in res.findBadWords.antispoofDdFound) {
          data.badWordResult.found.push(res.findBadWords.antispoofDdFound[idx]);
          data.badWordResult.positions.push(JSON.stringify(res.findBadWords.antispoofDdPositions[idx]));
          data.badWordResult.kind.push('유사자모 변환 후 한글 축약');
        }
      }
      if (Array.isArray(res.findBadWords.antispoofDdsFound)) {
        for (idx in res.findBadWords.antispoofDdsFound) {
          data.badWordResult.found.push(res.findBadWords.antispoofDdsFound[idx]);
          data.badWordResult.positions.push(JSON.stringify(res.findBadWords.antispoofDdsPositions[idx]));
          data.badWordResult.kind.push('유사자모 변환 후 한글 축약 후 평음화');
        }
      }
      if (Array.isArray(res.findBadWords.antispoofDoubleEnd)) {
        for (idx in res.findBadWords.antispoofDoubleEnd) {
          data.badWordResult.found.push(res.findBadWords.antispoofDoubleEnd[idx]);
          data.badWordResult.positions.push(res.findBadWords.antispoofDoubleEndPositions[idx]);
          data.badWordResult.kind.push('유사자모 변환 후 부적절 겹받침');
        }
      }
      if (Array.isArray(res.findBadWords.pronounceFound)) {
        for (idx in res.findBadWords.pronounceFound) {
          data.badWordResult.found.push(res.findBadWords.pronounceFound[idx]);
          data.badWordResult.positions.push(JSON.stringify(res.findBadWords.pronouncePositions[idx]));
          data.badWordResult.kind.push('로마자 발음 찾기');
        }
      }
      if (Array.isArray(res.findBadWords.pronounceDdFound)) {
        for (idx in res.findBadWords.pronounceDdFound) {
          data.badWordResult.found.push(res.findBadWords.pronounceDdFound[idx]);
          data.badWordResult.positions.push(JSON.stringify(res.findBadWords.pronounceDdPositions[idx]));
          data.badWordResult.kind.push('로마자 발음 찾기 후 한글 축약');
        }
      }
      if (Array.isArray(res.findBadWords.pronounceDdsFound)) {
        for (idx in res.findBadWords.pronounceDdsFound) {
          data.badWordResult.found.push(res.findBadWords.pronounceDdsFound[idx]);
          data.badWordResult.positions.push(JSON.stringify(res.findBadWords.pronounceDdsPositions[idx]));
          data.badWordResult.kind.push('로마자 발음 찾기 후 한글 축약 후 평음화');
        }
      }
      if (Array.isArray(res.findBadWords.pronounceDoubleEnd)) {
        for (idx in res.findBadWords.pronounceDoubleEnd) {
          data.badWordResult.found.push(res.findBadWords.pronounceDoubleEnd[idx]);
          data.badWordResult.positions.push(res.findBadWords.pronounceDoubleEndPositions[idx]);
          data.badWordResult.kind.push('로마자 발음 찾기 후 부적절 겹받침');
        }
      }
      console.log('결과')
      // 작업 후 버튼 활성화
      document.querySelector('.result-button').disabled = false;
      document.querySelector('.result-button').classList.remove('disabled');
      document.querySelector('.reset-button').disabled = false;
      document.querySelector('.reset-button').classList.remove('disabled');
    }

    const reset = () => {
      data.inputSentence = data.filteredSentence = '';
      data.badWordResult = {
        found: [], positions:[], kind: []
      };
    }

    return {
      data,
      reset,
      checkSentence
    };
  }

};
</script>

<style lang="scss" scoped>
.tab-contents-3 {

  // 비속어
  &-box {
    margin: 5px 5px 20px 5px;
    padding: 10px;
    border: 1px solid #eeeeee;
    background: #ffffd8;
  }
  &-flex {
    display:flex;
  }

  // 체크박스 너비
  input[type="checkbox"] {
    width: 2em;
  }

  // 글상자 너비
  #bad-word-check {
    width: 30em;
    margin-left: 2em;
  }

  // 버튼 간경
  button[class$="button"] {
    margin-left: 2em;
    cursor:pointer;
  }
  button.disabled {
    cursor: not-allowed;
  }

}
</style>

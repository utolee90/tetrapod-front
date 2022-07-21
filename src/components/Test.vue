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
      <!-- tab-contents-2 -->
      <ConvertA/>

      <!-- tab-contents-3 -->
      <FilterA :badWordFilter="badWordFilter" :changeOptions="changeOptions"/>
      <!--
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
      -->
    </div>
  </div>

</template>

<script>
import {reactive} from 'vue';
import Tetrapod from './tetrapod.js';
import badWords from '../assets/dictionaries/bad-words.json';
import macros from '../assets/dictionaries/macros.json';
import normalWords from '../assets/dictionaries/normal-words.json';
import ConvertA from './ConvertA';
import FilterA from './FilterA';

export default {
  name: "TetraPod",
  components:{
    ConvertA,
    FilterA
  },
  props: {
  },
  setup(props) {
    console.log(props);
    const obj = new Tetrapod();
    const data = reactive({
      badWordsList: '',
      normalWordsList: '',
      macrosList: '',
      parsedBadWordsList: ''
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

    // 비속어 필터 작동
    const badWordFilter = (sentence, splitCheck) => {
      return {
        fixed: obj.fix(sentence, '*'),
        findBadWords: obj.find(sentence, true, splitCheck)
      }
    }

    // 변환 문장 탭
    const changeOptions = () => {
      let levelFilter = [ // 1,2,3,4 중에서 추가로 비속어로 지정할 유형
          document.querySelector('#level-1-option').checked, document.querySelector('#level-2-option').checked,
        document.querySelector('#level-3-option').checked, document.querySelector('#level-4-option').checked
      ]
      let kindFilter = [ // drug, insult, sexuality, violence 중 명시할 유형
        document.querySelector('#kind-drug-option').checked, document.querySelector('#kind-insult-option').checked,
        document.querySelector('#kind-sexuality-option').checked, document.querySelector('#kind-violence-option').checked
      ]
      let engFilter = [ // qwerty(한영자판 전환), antispoof(유사자모 잡기), pronounce(발음) 중 추가변환해서 비속어 찾을 유형
        document.querySelector('#qwerty-option').checked, document.querySelector('#antispoof-option').checked, document.querySelector('#pronounce-option').checked
      ]
      let levelOpt = [1,2,3,4].filter((x, idx)=> (levelFilter[idx]));
      let kindOpt = ['drug', 'insult', 'sexuality', 'violence'].filter((x, idx)=> (kindFilter[idx]));
      let engOpt = ['qwerty', 'antispoof', 'pronounce'].filter((x, idx)=> (engFilter[idx]));
      obj.adjustFilter(levelOpt, kindOpt, engOpt, document.querySelector('#drop-double-option').checked);
    }

    return {
      data,
      tabShow,
      recall,
      modify,
      badWordFilter,
      changeOptions,
    };
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
    width: 45vw;
    margin: 1em auto 3em auto;
    justify-content: space-evenly;

    .tab-title {
      cursor: pointer;
      border: 1px solid grey;
      padding: 3px;
      flex-basis: 20vw;
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

    // 버튼
    button {
      border-radius: 5px;
      font-weight: bold;
      background-color: #a2c3ff;
      box-shadow: 5px 5px 4px #789;
    }

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

  }
}
</style>

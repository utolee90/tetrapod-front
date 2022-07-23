
// 한글 용도로 추가

// 초성
const charInitials= [
    'ㄱ', 'ㄲ','ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];
// 중성
const charMedials = [
    'ㅏ', 'ㅐ' , 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
];
// 단모음
// const charSimpleMedials = [
//     'ㅏ', 'ㅐ' , 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', , 'ㅣ'
// ];
// 종성
// const charFinals = [
//     'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ',
//     'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
// ];

// //초성+종성
// const charConsonants = [
//         'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ',
//         'ㅂ', 'ㅃ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
// ];

// 쌍자음 추가
// const doubleConsonant2 = [
//     ['ㄱ', 'ㄱ'], ['ㄷ','ㄷ'], ['ㅂ', 'ㅂ'], ['ㅅ', 'ㅅ'], ['ㅈ', 'ㅈ']
// ]

// 이중 받침 자음
const doubleConsonant =  [
    ['ㄱ','ㄱ'], ['ㄱ','ㅅ'], ['ㄴ','ㅈ'], ['ㄴ','ㅎ'], ['ㄹ','ㄱ'], ['ㄹ','ㅁ'], ['ㄹ','ㅂ'], ['ㄹ','ㅅ'],
    ['ㄹ','ㅌ'], ['ㄹ','ㅍ'], ['ㄹ','ㅎ'], ['ㅂ','ㅅ'], ['ㅅ','ㅅ']
];

// 이중 모음
const doubleVowel =  [
    ['ㅗ','ㅏ'], ['ㅗ','ㅐ'], ['ㅗ','ㅣ'], ['ㅜ','ㅓ'], ['ㅜ','ㅔ'], ['ㅜ','ㅣ'], ['ㅡ','ㅣ']
];

// 치음
const toothConsonant = ["ㄷ", "ㄸ", "ㅅ", "ㅆ", "ㅈ", "ㅉ", "ㅊ"];
// i 포함 모음
const iVowel = ['ㅑ', 'ㅒ', 'ㅕ', 'ㅖ', "ㅛ", "ㅠ", "ㅢ", "ㅣ"];

// isInChar 함수에서 사용함.
// 유사한 초성 -> 가! -> 카, 까 포함
// 수정 - 같은 음도 포함하게 수정해서 효율 증대
const simInit =  {
    "ㄱ":['ㄱ', "ㄲ", "ㅋ"], "ㄲ":['ㄲ', 'ㅋ'], 'ㄴ': ['ㄴ'], "ㄷ":['ㄷ', "ㄸ", "ㅌ"], "ㄸ":['ㄸ', "ㅉ", "ㅌ"], "ㄹ":["ㄴ", 'ㄹ'],
    "ㅁ": ['ㅁ'], "ㅂ":['ㅂ', "ㅃ", "ㅍ"], "ㅃ":['ㅃ', "ㅍ"], "ㅅ":['ㅅ', "ㅆ"], "ㅆ": ['ㅅ', 'ㅆ', "ㅉ"], "ㅇ": ["ㅇ"],
    "ㅈ":[ "ㅈ", "ㅉ", "ㅊ"], "ㅉ":["ㄸ", "ㅉ", "ㅊ" ], "ㅊ":["ㅉ", "ㅊ"], "ㅋ":["ㄲ", "ㅋ"], "ㅌ":["ㄸ", "ㅌ"], "ㅍ":["ㅃ", "ㅍ"], "ㅎ":["ㅍ", "ㅎ"]
};

// 모음이 ㅣ가 끼어들어간 경우 유사자음을 좀 더 확장한다. 냐! -> 야도 포함
const iSimInit = {
    ...simInit, "ㄴ": ['ㄴ', 'ㅇ'], 'ㄷ': ['ㄷ', 'ㄸ', 'ㅌ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅉ'], 'ㄸ': ['ㄸ', 'ㅉ', 'ㅌ', 'ㅆ'], 'ㄹ': ['ㄴ', 'ㄹ', 'ㅇ'],
    "ㅅ": ["ㅅ", "ㅆ", "ㄷ", "ㄸ", 'ㅈ', "ㅉ"], "ㅈ": ["ㅈ", "ㅉ", "ㅊ", "ㄷ", "ㄸ", "ㅅ", "ㅆ"], "ㅉ":["ㄸ", "ㅆ", "ㅉ", "ㅊ"],
    "ㅊ": ["ㄸ", "ㅉ", "ㅊ", "ㅌ"], "ㅌ": ["ㄸ", "ㅌ", "ㅉ", "ㅊ"]
}

// 유사한 중성
// 유사중성.  고! -> 거, 교, 개! -> 게, 괘, 괴, 궤
const simMiddle =  {
    "ㅏ":["ㅏ", "ㅘ"], "ㅐ":["ㅐ", "ㅔ", "ㅙ", "ㅚ", "ㅞ"], "ㅑ": ['ㅏ', 'ㅑ'], "ㅒ":["ㅐ", "ㅒ", "ㅔ", "ㅖ"],
    "ㅓ":['ㅓ', "ㅝ", "ㅗ"], "ㅔ":[ "ㅐ", "ㅔ", 'ㅙ', 'ㅚ', 'ㅞ'], "ㅕ":['ㅓ', "ㅕ", "ㅛ"], "ㅖ":['ㅐ', 'ㅒ', 'ㅔ', "ㅖ"],
    "ㅗ":["ㅓ","ㅗ", "ㅚ"], "ㅘ": ["ㅘ", "ㅏ"], "ㅙ":["ㅚ", "ㅙ", 'ㅞ', "ㅐ"], "ㅚ":[ "ㅗ", "ㅚ", "ㅙ", "ㅞ"], "ㅛ":["ㅕ", "ㅗ", "ㅛ"],
    "ㅜ":["ㅜ", "ㅡ"], "ㅝ": ["ㅝ", "ㅓ"], "ㅞ":["ㅔ", "ㅙ", "ㅞ", "ㅚ"], "ㅟ": ["ㅟ", "ㅣ"], "ㅠ": ["ㅜ","ㅠ"],
    "ㅡ":["ㅡ", "ㅜ"], "ㅢ": ["ㅢ", "ㅣ"], "ㅣ":["ㅟ", "ㅢ", "ㅣ"]
};

// 치음일 때의 유사중성. 치음은 i 반모음을 무시하므로 같은 음가로 취급. 즉 자! -> 자, 좌 이외 쟈도 포함
const toothSimMiddle =  { ...simMiddle,
    "ㅏ":["ㅏ", "ㅘ", "ㅑ"], "ㅐ": ["ㅐ", "ㅔ", "ㅙ", "ㅚ", "ㅞ", "ㅒ", "ㅖ"],
    "ㅓ":['ㅓ', "ㅝ", "ㅗ", "ㅕ", "ㅛ"], "ㅔ":[ "ㅐ", "ㅔ", 'ㅙ', 'ㅚ', 'ㅞ', "ㅒ", "ㅖ"], "ㅕ":['ㅓ', "ㅕ", "ㅛ", "ㅗ"],
    "ㅗ":["ㅓ","ㅗ", "ㅚ", "ㅕ", "ㅛ"], "ㅘ": ["ㅘ", "ㅏ", "ㅑ"], "ㅙ":["ㅚ", "ㅙ", 'ㅞ', "ㅐ", "ㅒ"], "ㅚ": ["ㅗ", "ㅚ", "ㅙ", "ㅞ", "ㅛ"],
    "ㅜ":["ㅜ", "ㅡ", "ㅠ"], "ㅝ": ["ㅝ", "ㅓ", "ㅕ"], "ㅞ": ["ㅔ", "ㅙ", "ㅞ", "ㅚ", "ㅖ"], "ㅡ": ['ㅡ', "ㅜ", "ㅠ"]
};

// 유사종성 -> 뒷글자가 없을 때
const simEnd= {
    "": [""],
    "ㄱ": ["ㄱ", "ㅋ", "ㄲ", "ㄳ", "ㄺ"], "ㄲ":["ㄱ", "ㄲ", "ㅋ"], "ㄳ": ["ㄱ", "ㄳ", "ㅅ"], "ㄴ": ["ㄴ", "ㄵ", "ㄶ"], "ㄵ": ["ㄴ", "ㄵ", "ㅈ"], "ㄶ": ["ㄴ", "ㄶ"],
    "ㄷ":["ㄷ", "ㅌ", "ㅅ", "ㅆ", "ㅈ", "ㅊ"], "ㄹ": ["ㄹ", "ㄼ", "ㄽ", "ㄾ", "ㅀ"], "ㄺ": ["ㄺ", "ㄱ", "ㄹ"], "ㄻ": ["ㄻ", "ㄹ", "ㅁ"], "ㄼ": ["ㄹ", "ㄼ", "ㅂ", "ㅍ"],
    "ㄽ": ["ㄹ", "ㄽ", "ㅅ"], "ㄾ": ["ㄷ", "ㄹ", "ㄾ", "ㅌ"], "ㄿ": ["ㄹ", "ㄿ", "ㅂ", "ㅍ"], "ㅀ": ["ㄹ", "ㅀ"], "ㅁ": ["ㅁ", "ㄻ"],
    "ㅂ":["ㅂ", "ㅄ", "ㅍ"], "ㅄ": ["ㅂ", "ㅄ", "ㅅ"], "ㅅ":["ㅅ", "ㄷ", "ㅌ", "ㅆ", "ㅈ", "ㅊ"], "ㅆ":["ㄷ", "ㅌ", "ㅅ", "ㅆ", "ㅈ", "ㅊ"], "ㅇ": ["ㅇ"],
    "ㅈ":["ㄷ", "ㅌ", "ㅅ", "ㅆ", "ㅈ", "ㅊ"], "ㅊ":["ㄷ", "ㅌ", "ㅅ", "ㅆ", "ㅈ", "ㅊ"], "ㅋ":["ㄱ", "ㄲ", "ㅋ"], "ㅌ":["ㄷ", "ㅅ", "ㅆ", "ㅈ", "ㅊ", "ㅌ"],
    "ㅍ":["ㅂ", "ㅍ", "ㄿ"], "ㅎ":["ㅎ", "ㄷ", "ㅅ"]
};

// 뒷글자에 의한 자음동화. 뒷글자가 특정한 자음일 때  삭!기 ->
// const jointConsonant =  {
//         "ㄱ":["ㄱ", "ㄲ", "ㅋ"], "ㄲ":["ㄱ", "ㅋ", "ㄲ"], "ㄴ":["ㄴ", "ㄷ", "ㅅ"], "ㄷ":["ㄷ", "ㅌ", "ㅅ", "ㅆ", "ㅈ", "ㅊ"], "ㄸ":["ㄷ","ㅌ", "ㄸ", "ㅅ", "ㅆ", "ㅈ", "ㅊ" ], "ㄹ":["ㄴ", "ㄹ"],
//         "ㅁ":["ㅁ", "ㅂ", "ㅍ"], "ㅂ":["ㅁ", "ㅂ", "ㅍ"], "ㅃ":["ㅁ", "ㅂ", "ㅃ"], "ㅅ":["ㅅ", "ㄷ", "ㅌ", "ㅆ", "ㅈ", "ㅊ"], "ㅆ":["ㄷ", "ㅌ", "ㅅ", "ㅆ", "ㅈ", "ㅊ"], "ㅈ":["ㄷ", "ㅌ", "ㅅ", "ㅈ", "ㅆ", "ㅊ"],
//         "ㅊ":["ㄷ", "ㅌ", "ㅅ", "ㅆ", "ㅈ", "ㅊ"], "ㅋ":["ㄱ", "ㄲ", "ㅋ"], "ㅌ":["ㄷ", "ㅅ", "ㅆ", "ㅈ", "ㅊ", "ㅌ"], "ㅍ":["ㅁ", "ㅂ", "ㅍ"], "ㅎ":["ㅎ"]
//     };

// 뒷글자 ㅣ에 의한 모음동화 반영 -> 아비 -> 애비 등
const jointVowel = {
    "ㅏ":["ㅏ", "ㅐ"],  "ㅓ":['ㅓ', "ㅔ"],  "ㅗ":['ㅗ', "ㅚ"], "ㅜ":['ㅜ', "ㅟ"], "ㅡ":['ㅡ', "ㅢ"]
};


// 두벌식 <->QWERTY 자판 호환. 한/영 키를 이용해서 욕설을 우회하는 것을 방지함.
const enKoKeyMapping = {
    'q':'ㅂ', 'Q':'ㅃ', 'w':'ㅈ', 'W':'ㅉ', 'e': 'ㄷ', 'E':'ㄸ', 'r':'ㄱ', 'R':'ㄲ', 't':'ㅅ', 'T':'ㅆ',
    'y':'ㅛ', 'Y':'ㅛ', 'u':'ㅕ', 'U':'ㅕ',  'i':'ㅑ', 'I': 'ㅑ', 'o': 'ㅐ', 'O': 'ㅒ', 'p':'ㅔ', 'P':'ㅖ',
    'a':'ㅁ', 'A':'ㅁ', 's':'ㄴ', 'S':'ㄴ', 'd': 'ㅇ', 'D':'ㅇ', 'f':'ㄹ', 'F': 'ㄹ', 'g': 'ㅎ', 'G':'ㅎ',
    'h':'ㅗ', 'H':'ㅗ', 'j':'ㅓ', 'J':'ㅓ', 'k':'ㅏ', 'K':'ㅏ', 'l':'ㅣ', 'L':'ㅣ',
    'z':'ㅋ', 'Z':'ㅋ', 'x':'ㅌ', 'X':'ㅌ', 'c':'ㅊ', 'C':'ㅊ', 'v':'ㅍ', 'V':'ㅍ',
    'b':'ㅠ', 'B':'ㅠ', 'n':'ㅜ', 'N':'ㅜ', 'm':'ㅡ', 'M':'ㅡ', '2':'ㅣ', '5':'ㅗ', '^':'ㅅ', '@':"ㅇ"
};

// 한영발음 메커니즘 - 중복 없애기
const alphabetPronounceMapping = {
    // 메커니즘 - 우선 한/영 분리를 합니다. 그 다음에 한국어 비속어를 이용해서 영어 패턴을 생성합니다.
    consonants: {'ㄱ':['g'], 'ㄴ':['n'], 'ㄷ':['d','dd','tt'], 'ㄹ':['l','r'], 'ㅁ':['m'], 'ㅂ':['b', 'v'], 'ㅅ':['s', 'x', 'sh'], 'ㅇ':[''],
        'ㅈ':['j','z', 'jh'], 'ㅊ':['ch', 'zh'], 'ㅋ':['c', 'k', 'kh', 'q'], 'ㅌ':['t', 'th'],'ㅍ':['p', 'ph', 'f'], 'ㅎ':['h'],
        'ㄲ': ['gg', 'kk'], 'ㄸ': ['dd', 'tt'], 'ㅃ': ['bb', 'pp'], 'ㅆ': ['ss'], 'ㅉ': ['zz', 'jj']}, //쌍자음은 단자음으로 바꾸어서 전환 예정
    vowels : {'ㅏ':['a'], 'ㅐ':['ae'], 'ㅓ':['eo'], 'ㅔ':['e'],  'ㅗ':['o'], 'ㅚ':['oe', 'oi'],  'ㅜ':['u', 'oo'], 'ㅟ':['ui'], 'ㅡ':['eu', ''], 'ㅢ':['eui'], 'ㅣ':['i', 'ee']},
    doubleVowels: {
        'ㅑ':['ya'], 'ㅒ':['yae'], 'ㅕ':['yeo'], 'ㅖ':['ye'],'ㅘ':['wa'], 'ㅙ':['wae'], 'ㅝ':['wo', 'wu', 'weo'], 'ㅛ':['yo'], 'ㅞ':['we'], 'ㅟ':['wi'],  'ㅠ':['yu', 'yoo'], 'ㅣ': ['y', 'yi'], '': ['w']
    },
    // 받침 - 기본 ㅅ으로 통일하고 상황에 따라 ㄷ을 사용하는 걸로 바꿔보자
    endConsonants:{ 'ㄱ':['g','k','x'], 'ㄴ':['n'], 'ㄹ':['l', 'r'], 'ㅁ':['m'], 'ㅂ':['p','b'], 'ㅅ':['s', 't', 'd'], 'ㅇ':['ng', 'nn'], '': ['h']},
};

// 단일 캐릭터일 때 단일발음에서 사용
const singlePronounce =  {
    'b': '비', 'c':'씨', 'd':'디', 'g': '지', 'l': '엘', 'm': '엠', 'n': '엔', 'p': '피', 'q': '큐', 'r': '알', 't': '티', 'x': 'X', 'z': '지',
    '十':'십', '+':'십', "奀":"좆", '1':'일', '2':'이', '3':'삼', '4':'사', '5':'오', '6':'육', '7':'칠', '8':'팔', '9':'구', '0':'영',
    'ㄹ': '근'
};

// 자모와 자형이 유사한 경우 사용
const similarConsonant= {
    '2':'ㄹ', '3':'ㅌ', "5":'ㄹ', '7':'ㄱ', '0':'ㅇ', 'C':'ㄷ', 'c':'ㄷ', 'D':'ㅁ', 'E':'ㅌ', "L":'ㄴ', 'M':'ㅆ', 'm':'ㅆ', 'n':'ㅅ', 'o': 'ㅇ', 'O': 'ㅇ', 'S':'ㄹ', 's':'ㄹ',
    'V':'ㅅ', 'v':'ㅅ', 'w':'ㅆ', 'W':'ㅆ', 'Z':'ㄹ', 'z':'ㄹ', '@':'ㅇ', '#':'ㅂ', '^':'ㅅ',
};

// 모음과 자형이 유사한 경우에 대비함
const similarVowel =  {
    '1':'ㅣ', 'H':'ㅐ', 'I':'ㅣ', 'l':'ㅣ', 'T':'ㅜ', 't':'ㅜ', 'y':'ㅓ', '!':'ㅣ',  '_':'ㅡ', '-':'ㅡ', '|':'ㅣ'
};

//자형이 유사한 단어들 모음. 추후 반영 예정
// const similarShape = [
//     ['ㄹ','근'], ['4', '니'], ['대', '머'], ['댁','먹'], ['댄', '먼'], ['댈', '멀'], ['댐', '멈'], ['댕', '멍'], ['金', '숲']
//         ['奀', '좃', '좆'], ['長', '튼'], ['%', '응'], ['q', '이']
// ];

// 겹자모 출력
const doubleMap = {
    'ㄲ': ['ㄱ','ㄱ'], 'ㄳ':['ㄱ','ㅅ'], 'ㄵ': ['ㄴ','ㅈ'], 'ㄶ' :['ㄴ','ㅎ'], 'ㄸ':['ㄷ', 'ㄷ'], 'ㄺ': ['ㄹ','ㄱ'],
    'ㄻ': ['ㄹ','ㅁ'], 'ㄼ': ['ㄹ','ㅂ'], 'ㄽ': ['ㄹ','ㅅ'], 'ㄾ': ['ㄹ','ㅌ'], 'ㄿ': ['ㄹ','ㅍ'], 'ㅀ': ['ㄹ','ㅎ'],
    'ㅃ': ['ㅂ','ㅂ'], 'ㅄ': ['ㅂ','ㅅ'], 'ㅆ': ['ㅅ','ㅅ'], 'ㅉ': ['ㅈ','ㅈ'], 'ㅘ': ['ㅗ','ㅏ'],
    'ㅙ': ['ㅗ','ㅐ'], 'ㅚ': ['ㅗ','ㅣ'], 'ㅝ': ['ㅜ','ㅓ'], 'ㅞ': ['ㅜ','ㅔ'], 'ㅟ': ['ㅜ','ㅣ'], 'ㅢ': ['ㅡ','ㅣ'],
    'ㅑ': ['ㅣ', 'ㅏ'], 'ㅒ': ['ㅣ', 'ㅐ'], 'ㅕ': ['ㅣ', 'ㅓ'], 'ㅖ': ['ㅣ', 'ㅔ'], 'ㅛ': ['ㅣ', 'ㅗ'], 'ㅠ': ['ㅣ', 'ㅜ']
}


export {
    charInitials,
    charMedials,
    // charSimpleMedials,
    // charFinals,
    // charConsonants,
    doubleConsonant,
    doubleVowel,
    toothConsonant,
    iVowel,
    simInit,
    iSimInit,
    simMiddle,
    toothSimMiddle,
    simEnd,
    // jointConsonant,
    jointVowel,
    enKoKeyMapping,
    alphabetPronounceMapping,
    singlePronounce,
    similarConsonant,
    similarVowel,
    // similarShape,
    doubleMap
};

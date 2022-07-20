# tetrapod-front

## 개요 
비속어 필터링 프로젝트인 [Tetrapod](https://github.com/utolee90/tetrapod) 를 웹페이지 형식으로 돌릴 수 있게 한 작업입니다. Vue-cli 기반으로 작성된 프로젝트로 자세한 내용은 [Configuration Reference](https://cli.vuejs.org/config/) 부분을 참조하시면 됩니다.

## 프로젝트 설치 방법
우선 node.js와 git을 설치한 뒤 원하는 디렉토리에 다음과 같은 명령어를 입력하시면 프로젝트를 실행시킬 수 있습니다.
```
> git clone https://github.com/utolee90/tetrapod-front.git
```
그러면 tetrapod-front라는 카테고리 명으로 

### 패키지 설치 방법
tetrapod-front 디렉토리에서 다음과 같은 명령어를 입력하시면 됩니다.

```
npm install
```

### 패키지 구동 방법
tetrapod-front 디렉토리에서 다음과 같은 명렁어를 입력하시면 패키지가 로컬호스트에서 구동이 됩니다. 기본 주소는 `localhost:8080`이며, 8080 포트가 이미 점유된 경우 다른 포트에 연결될 수도 있으니 콘솔 창을 확인해주시기 바랍니다.
```
npm run serve
```

### 컴파일 후에 패키지 빌드 방법
우선 `vue.config.js` 파일에 패키지를 빌드할 상대 URL을 변경하신 뒤 (기본은 `/tetrapod`) 아래와 같은 명렁어를 입력하시면 `dist`디렉토리에 결과물이 빌드가 됩니다.
```
npm run build
```

### 린트/수정.
```
npm run lint
```

## 프로젝트 사용 방법
프로젝트는 기본적으로 3개 페이지로 구성되어 있습니다. 
### 필터 확인하기

### 한글 변환함수 실험

### 비속어 찾기 결과

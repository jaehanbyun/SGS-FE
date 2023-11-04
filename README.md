# 개요
- Zoom과 같은 화상회의를 바탕으로 일정관리와 공부시간을 저장하고 관리하는 기능을 더하였습니다.

## 기술 스택
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"><img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"><img src="https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=PostCSS&logoColor=white"><img src="https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=WebRTC&logoColor=white">
외에 시그널링서버와 연결을 위한 kurent-utils 채팅을 위한 SockJS, StompJS, axois, chartjs, moment, swiper 등등

## 디렉토리 구조
- api: api 요청을 위한 baseURL을 저장.
- components: 페이지를 구성하는 컴포넌트.
- hooks:Custom hook를 모아둠
- pages: 사이트를 구성하는 페이지 모음
- redux: 전역상태를 위한 redux
- styles: 전역 css
- utils: 사이트의 채팅 webrtc 기능을 하는 파일들

## 기능 소개

<img width="1494" alt="image" src="https://github.com/jaehanbyun/SGS-FE/assets/96977881/a28565fe-6071-4fe4-b87e-c4dd8bdc0321">

- 프리뷰 페이지 swiper 적용 자동 스크롤 (위 사진들은 기능과 관련이 없습니다)

<img width="573" alt="image" src="https://github.com/jaehanbyun/SGS-FE/assets/96977881/d857324d-ef88-413d-8450-312184eeaf1c">

<img width="533" alt="image" src="https://github.com/jaehanbyun/SGS-FE/assets/96977881/f012f8f7-9f25-4e9e-ac2e-e352ef856449">

- 회원가입 및 로그인 페이지 각각 버튼으로 토글

<img width="1509" alt="image" src="https://github.com/jaehanbyun/SGS-FE/assets/96977881/cd99fb79-1ff0-4a62-8fd8-6063107b1398">
<img width="754" alt="image" src="https://github.com/jaehanbyun/SGS-FE/assets/96977881/3be3de48-c96a-4bf3-892d-7343ea94bdbd">

- 메인 화면 방목록 무한 스크롤 적용 모바일 반응형 적용
- 각 카테고리별 방 생성 가능
- 아래 그룹은 private 방으로 코드 입력으로 가입하고 입장이 가능

![image](https://github.com/jaehanbyun/SGS-FE/assets/96977881/d58afb72-7a4d-495a-ba3e-f5c99abddfd0)
![스크린샷 2023-11-05 오전 12 47 22](https://github.com/jaehanbyun/SGS-FE/assets/96977881/778c2ddf-f02d-4d6a-869c-589ad62e2f93)
![스크린샷 2023-11-05 오전 12 47 34](https://github.com/jaehanbyun/SGS-FE/assets/96977881/f02818ad-49c7-4753-92ed-b2eca7138fa9)

- 각각 프로필 수정, 공부시간 차트, 스케쥴 등록이 가능한 달력(미완성) 화면입니다.

<img width="1162" alt="image" src="https://github.com/jaehanbyun/SGS-FE/assets/96977881/9c3da829-e9d3-4d33-b1ed-a160b133241e">

- 방생성 모달 인원의 최대 10명, 방은 코드로 입장하는 비공개방과 방 목록에 공개되어 로그인한 유저는 누구나 입장 가능한 공개방이 있음

<img width="1443" alt="image" src="https://github.com/jaehanbyun/SGS-FE/assets/96977881/4c66962b-c76a-417c-9928-09aa21210840">
<img width="426" alt="image" src="https://github.com/jaehanbyun/SGS-FE/assets/96977881/b4e87c8d-db19-4c38-8974-1af743d5a9e0">
<img width="455" alt="image" src="https://github.com/jaehanbyun/SGS-FE/assets/96977881/bee3dd04-1030-4c30-b01a-e232602eabfc">

- 비디오 화면, 소리와 비디오 on/off, 공부시간 표시 등을 지원합니다. 방장의 경우 강퇴, 경고, 방장 위임등이 가능. 방장이 아니면 해당 메뉴는 비활성화 됨
- 공부시간 타이머는 수동으로 키고 끌 수가 있음 5시가 되면 자동으로 초기화되고 그날 공부시간은 서버로 전송됨

![image](https://github.com/jaehanbyun/SGS-FE/assets/96977881/9334f9b3-ee6d-4002-9bfb-03d27a8ba794)
- 화면 고정
![image](https://github.com/jaehanbyun/SGS-FE/assets/96977881/f81f09a4-ef3a-48fe-89ea-74542aff8279)
- 화면 공유

![image](https://github.com/jaehanbyun/SGS-FE/assets/96977881/37155928-3494-401b-bc1d-273497acba7d)
![image](https://github.com/jaehanbyun/SGS-FE/assets/96977881/b2564a0d-d30a-41c4-8d1f-f33c4e79ce5d)

- 방 내 채팅 기능

![스크린샷 2023-11-05 오전 12 23 46](https://github.com/jaehanbyun/SGS-FE/assets/96977881/d4879b16-6930-46bf-8a79-8205871160fa)
![스크린샷 2023-11-05 오전 12 23 57](https://github.com/jaehanbyun/SGS-FE/assets/96977881/764d9fc0-c9d5-4b81-b234-cea0595fce2a)


- 비공개 그룹으로 방 생성시 왼쪽 그룹탭에 새로만든 방이 등록됨
- 공개방과 다르게 초대코드 생성 버튼이 생김

![스크린샷 2023-11-05 오전 12 25 14](https://github.com/jaehanbyun/SGS-FE/assets/96977881/8ba3c012-18a7-4fd3-a269-e3c1593e3a05)
![스크린샷 2023-11-05 오전 12 25 32](https://github.com/jaehanbyun/SGS-FE/assets/96977881/e38e1bda-085b-4f16-a283-ff3b00a84fc5)
![스크린샷 2023-11-05 오전 12 27 53](https://github.com/jaehanbyun/SGS-FE/assets/96977881/d3e1d64a-a863-4b69-a4bc-176cbdefe2ba)

- 이 초대코드로 비공개방에 입장이 가능
- 비공개로 체크하고 방을 생성하면 그룹 탭에 방이 추가됨

![image](https://github.com/jaehanbyun/SGS-FE/assets/96977881/e85d36e1-255b-49b4-a8ed-a586702e36f9)
- 그 외의 기능은 공개방과 동일하고 방에도 마찬가지로 화면 크기별로 반응형이 적용되어있음

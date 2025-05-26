# 🍌 배나나 (BAENANA)

> 여성의 건강과 생리 주기 관리를 위한 모바일 앱, **배나나**의 프론트엔드 리포지토리입니다.  
> React Native + TypeScript 기반으로 개발되었으며, 캘린더, pdf 저장 기능 등을 포함합니다.

---

## 📐 피그마 디자인

> 전체 UI 설계는 아래 링크에서 확인할 수 있습니다.  
[Figma 디자인 링크 바로가기](https://www.figma.com/design/dnrEUEYtDQM0ICRMN2drkV/S205_%EB%AA%A9%EC%97%85?node-id=0-1&t=R5RvKGnFykafFuW7-1)

---

## 🛠 기술 스택

### 🧩 기본 프레임워크
- **React Native**: 0.79.1
- **React**: 19.0.0
- **TypeScript**: 5.0.4

### 🧭 네비게이션
- @react-navigation/native
- @react-navigation/native-stack
- @react-navigation/bottom-tabs
- @react-navigation/drawer
- react-native-screens
- react-native-safe-area-context
- react-native-gesture-handler

### ⚙️ 상태 & API 관리
- zustand – 전역 상태 관리
- @tanstack/react-query – 서버 상태 캐싱
- axios – API 요청

### 🎨 UI & 스타일링
- nativewind + tailwindcss – 스타일링
- lucide-react-native – 아이콘
- react-native-vector-icons
- react-native-linear-gradient – 그라데이션 효과
- react-native-modalize – 바텀시트
- react-native-bootsplash – 스플래시 화면

### 📆 기능성 라이브러리
- react-native-calendars – 캘린더 UI
- react-native-date-picker – 날짜 선택
- react-native-view-shot – 스크린샷 캡처
- react-native-html-to-pdf – PDF 변환
- react-native-permissions – 권한 제어
- react-native-fs – 파일 시스템 접근
- react-native-dotenv – 환경 변수
- @react-native-seoul/kakao-login – 카카오 로그인 연동
- react-native-vision-camera – 카메라 접근

### 📊 시각화 & 차트
- react-native-svg
- react-native-svg-charts
- react-native-reanimated-carousel – 슬라이드 뷰


### 🧹 린트 & 포매팅
- eslint + @typescript-eslint/eslint-plugin
- prettier + eslint-config-prettier

---

## 📁 폴더 구조
```
src/
├── api/
│   ├── client/  # Axios 클라이언트 설정
│   └── quries/  # React Query 쿼리 정의
├── assets/  # 이미지, 아이콘, 폰트 등 정적 리소스
├── components/  # 재사용 가능한 공통 컴포넌트
├── hooks/  # 커스텀 React 훅
├── navigation/  # React Navigation 설정
├── screens/   # 주요 화면 컴포넌트
├── store/  # Zustand 전역 상태 관리
├── types/  # 타입 정의
└── utils/  # 유틸리티 함수

```

---

## ⚙️ 프로젝트 실행 방법

### 1. 클론 및 패키지 설치

```bash
git clone 
cd frontend
yarn install
```

### 2. 환경 변수(.env) 설정

```bash
API_BASE=
```

### 3. Android 실행

```bash
yarn android
```

---

## 📱 테스트 환경

- Android Emulator: **Galaxy S25** (API Level 36.0. / Android 16.0)

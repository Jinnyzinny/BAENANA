# 배나나
![image](/uploads/2c607d531b2ec5e9cf08e55cee4fdaa0/image.png){width=1289 height=716}
## 목차
1. [프로젝트 콘셉트](#프로젝트-콘셉트)
2. [핵심 기능](#핵심-기능)
3. [기능 소개](#기능-소개)
4. [기술 스택](#기술-스택)
   - [Management Tool](#management-tool)
   - [IDE](#ide)
   - [Infra](#infra)
   - [Frontend](#frontend)
   - [Backend](#backend)
5. [서비스 아키텍처](#서비스-아키텍처)
6. [설계 문서](#설계-문서)
   - [요구사항 정의서](#요구사항-정의서)
   - [기능 명세서](#기능-명세서)
   - [Flow Chart](#flow-chart)
   - [Mockup](#mockup)
   - [API 명세서](#api-명세서)
7. [ERD](#erd)
8. [포팅메뉴얼](#포팅메뉴얼)
9. [발표자료](#발표자료)
10. [팀 구성원](#팀-구성원)

## 프로젝트 콘셉트
**여성 건강 주기 관리 및 AI 챗봇 상담 지원 헬스케어 앱**

### 핵심 기능 
- **홈 화면**
  - 약 복용 / 산부인과 예약 알림 메시지
  - 남은 예정일 그래프 시각화
- **캘린더**
  - 주요 일정 확인
  - 약 복용 / 산부인과 예약 일정 등록 및 열람
  - 생리 주기 / 세부 증상 기록 및 열람
- **리포트**
  - 생리 주기 및 검사 결과 기반 그래프 생성
  - 사용자 입력 데이터 기반 이상 징후 알림
- **건강 컨텐츠**
  - 공인된 의료 정보 바탕 카드 뉴스 생성
- **챗봇**
  - 규칙 기반 챗봇 AI 챗봇 (LLM+RAG 혼합 모델)

## 기능 소개
### 홈 화면

![image](/uploads/5458d8015845e52bb7f91f8057f6a0c3/image.png){width=299 height=629}
### 캘린더
![image](/uploads/8f97afc60f809248cee61f1126ddc016/image.png){width=957 height=651}
### 리포트
![image](/uploads/a1aa419fef51c6919df189aae18dc633/image.png){width=689 height=678}
### 건강 컨텐츠
![image](/uploads/68ef6c9620c02a3a965007bc19e31a2d/image.png){width=307 height=630}
### 챗봇
![image](/uploads/e96d97966bb714e18547095c153b03d1/image.png){width=339 height=646}

## 기술 스택

### Management Tool

![gitlab](https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![jira](https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![notion](https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![figma](https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
### IDE

![intellij](https://img.shields.io/badge/intellij_idea-000000?style=for-the-badge&logo=intellijidea&logoColor=white)
![vscode](https://img.shields.io/badge/vscode-0078d7?style=for-the-badge&logo=visual%20studio&logoColor=white)
![postman](https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

### Infra

![amazonec2](https://img.shields.io/badge/amazon%20ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)
![nginx](https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![ubuntu](https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
 <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white">


### Frontend

<img src="https://img.shields.io/badge/Typescript_-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"> 
<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />



### Backend

![java](https://img.shields.io/badge/Java-007396?style=for-the-badge)
![springboot](https://img.shields.io/badge/spring%20boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![springjpa](https://img.shields.io/badge/spring%20jpa-6DB33F?style=for-the-badge&logo=Spring&logoColor=white)
![springsecurity](https://img.shields.io/badge/spring%20security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![jwt](https://img.shields.io/badge/jwt-000000?style=for-the-badge&logo=jwt&logoColor=white)
![mysql](https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white)


## 서비스 아키텍처

![image](/uploads/e62e4949d379462776d1a5f431306086/image.png){width=1054 height=595}

## 설계 문서

### [요구사항 정의서](https://lab.ssafy.com/s12-final/S12P31S205/-/blob/master/exec/%ED%8F%AC%ED%8C%85_%EB%A9%94%EB%89%B4%EC%96%BC.pdf)

### [기능 명세서](https://lab.ssafy.com/s12-final/S12P31S205/-/blob/master/exec/%ED%8F%AC%ED%8C%85_%EB%A9%94%EB%89%B4%EC%96%BC.pdf)

### [Flow Chart](https://lab.ssafy.com/s12-final/S12P31S205/-/blob/master/exec/%ED%8F%AC%ED%8C%85_%EB%A9%94%EB%89%B4%EC%96%BC.pdf)

### [Mockup](https://lab.ssafy.com/s12-final/S12P31S205/-/blob/master/exec/%ED%8F%AC%ED%8C%85_%EB%A9%94%EB%89%B4%EC%96%BC.pdf)

### [API 명세서](https://lab.ssafy.com/s12-final/S12P31S205/-/blob/master/exec/%ED%8F%AC%ED%8C%85_%EB%A9%94%EB%89%B4%EC%96%BC.pdf)

## ERD
![image](/uploads/41cf793137e2df8d953eaf7929db25ce/image.png)

### [포팅메뉴얼](https://lab.ssafy.com/s12-final/S12P31S205/-/blob/master/exec/%ED%8F%AC%ED%8C%85_%EB%A9%94%EB%89%B4%EC%96%BC.pdf)

## [발표자료](https://lab.ssafy.com/s12-final/S12P31S205/-/blob/master/exec/%ED%8F%AC%ED%8C%85_%EB%A9%94%EB%89%B4%EC%96%BC.pdf)

## 팀 구성원


| 역할   | 이름   | 담당 업무                          |
| ------ | ------ | --------------------------------- |
| **FE** | 최이화 |   |
| **FE** | 김태열 |   |
| **BE** | 이진형 |   |
| **AI** | 박가연 |  |
| **AI, BE** | 김민경 |    |
| **INFRA, BE** | 지수인 | 회원, 채팅, 건강 정보 관리 구현 및 인프라 세팅 |

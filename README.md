# 31th_1_solux_BORO_front
solux 31th BORO team Front End

<img src="public/logo1.png" alt="바로 로고" width="30%" />

## 🌀 BORO (바로)
> 바로 송이끼리! 대학생만의 신뢰 기반 대여 플랫폼

<br>

## 📌 목차
1. [팀원 소개](#-프론트엔드-팀원-소개)
2. [기술 스택](#-기술-스택)
3. [기능 소개](#-기능-소개)
4. [프로젝트 구조](#-프로젝트-구조)

<br>

## 💻 프론트엔드 팀원 소개 

| 신정원 (프론트장) | 김경민 (팀원) |
| :---: | :---: |
| <img src="https://github.com/gardenew12.png" width="100" height="100" alt="신정원 프로필" /> | <img src="https://github.com/gyeongmedium.png" width="100" height="100" alt="김경민 프로필" /> |
| [@gardenew12](https://github.com/gardenew12) | [@gyeongmedium](https://github.com/gyeongmedium) |
| UI/UX, API 연동<br>(홈, 마이페이지)<br>배포 | UI/UX, API 연동<br>(온보딩, 대여현황,<br>채팅, 마이페이지) |

<br>

## 🛠 기술 스택

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Environment & Tools
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

<br>

## 👻 기능 소개

### 🌀 온보딩

| 로그인 | 회원가입 | 
| :---: | :---: |
| <img src="src/assets/images/login.png" width="250"> | <img src="src/assets/images/signup.png" width="250"> |

<br>

### 🌀 홈

| 홈 (전체 대여) | 홈 (빈자리 핫클립) | 게시글 작성 | 게시글 상세보기 |
| :---: | :---: | :---: | :---: |
| <img src="src/assets/images/post.png" width="250"> | <img src="src/assets/images/spot.png" width="250"> | <img src="src/assets/images/create.png" width="250"> | <img src="src/assets/images/detailed_post.png" width="250"> |

<br>

### 🌀 대여현황

| 내가 빌려준 것 | 내가 빌린 것 | 
| :---: | :---: |
| <img src="src/assets/images/lent.png" width="250"> | <img src="src/assets/images/borrow.png" width="250"> |

<br>

### 🌀 채팅
| 물품 채팅 | 빈자리 채팅 | 채팅방 |
| :---: | :---: | :---: |
| <img src="src/assets/images/item_chat.png" width="250"> | <img src="src/assets/images/spot_chat.png" width="250"> | <img src="src/assets/images/detailed_chat.png" width="250"> |

<br>

### 🌀 마이페이지
| 기본 | 꾸미기 | 내가 작성한 게시글 |
| :---: | :---: | :---: |
| <img src="src/assets/images/mypage.png" width="250"> | <img src="src/assets/images/deco.png" width="250"> | <img src="src/assets/images/my_post.png" width="250"> |

| 거래 내역 | 받은 후기 | 보낸 후기 |
| :---: | :---: | :---: |
| <img src="src/assets/images/history.png" width="250"> | <img src="src/assets/images/review.png" width="250"> | <img src="src/assets/images/my_review.png" width="250"> |

| 찜한 게시물 보기 | 상점 | 포인트 |
| :---: | :---: | :---: |
| <img src="src/assets/images/liked.png" width="250"> | <img src="src/assets/images/store.png" width="250"> | <img src="src/assets/images/point.png" width="250"> |

| 프로필 수정 | 탈퇴 | 로그아웃 |
| :---: | :---: | :---: |
| <img src="src/assets/images/profile.png" width="250"> | <img src="src/assets/images/delete.png" width="250"> | <img src="src/assets/images/logout.png" width="250"> |

<br>

## 📂 프로젝트 구조
```text
public/             # 공통 logo 이미지
src/
├── api/            # API 요청 함수
├── assets/         # 아이템 이미지
├── components/     # 공통 재사용 컴포넌트 (Nav, Tab)
├── lib/            # 외부 라이브러리 설정 (Axios 인스턴스 등)
├── pages/          # 라우팅 페이지 컴포넌트
├── types/          # TypeScript 타입
├── utils/          # 유틸리티 함수
├── App.tsx         # 애플리케이션 최상위 및 라우팅 설정
├── index.css       # 글로벌 스타일 및 커스텀 스크롤 정의
└── main.tsx        # 엔트리 포인트
```


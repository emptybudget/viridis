# VIRIDIS 홈페이지

> 공간에 자연의 감각을 더하다.
> 실크플라워와 공간에 어울리는 프리미엄 플랜테리어 — **VIRIDIS**

빌드 도구 없이 동작하는 **정적 웹사이트**(HTML · CSS · JavaScript)입니다.
별도 설치 없이 파일만 수정하면 바로 반영되며, Vercel로 배포합니다.

---

## 1. 폴더 구조

```
viridis/
├── index.html                    # 페이지 전체 (헤더·히어로·소개·서비스·포트폴리오·문의·푸터)
├── assets/
│   ├── css/style.css             # 전체 스타일 (상단에 색상·폰트 토큰 정리)
│   ├── js/
│   │   ├── portfolio-data.js     # ★ 카테고리·포트폴리오 사진 목록 (내용 수정은 주로 여기)
│   │   └── main.js               # 필터, 사진 크게 보기, 메뉴, 스크롤 애니메이션
│   └── images/
│       ├── favicon.png, icon-512.png, apple-touch-icon.png  # 탭·홈화면 아이콘
│       ├── logo/                 # 로고 (초록 / 어두운 배경용 light / 투명 배경 원본 PNG)
│       ├── og-viridis.jpg          # 카카오톡·SNS 공유 미리보기 이미지 (1200x630)
│       └── portfolio/
│           ├── office/           # OFFICE      : 사무실 및 기업 공간
│           ├── commercial/       # COMMERCIAL  : 카페·매장·상업공간
│           ├── floral/           # FLORAL      : 실크플라워 연출
│           └── event/            # EVENT       : 행사 및 시즌 공간 장식
├── scripts/optimize-images.py    # 원본 사진 → 웹용 이미지 변환 도구
├── vercel.json                   # Vercel 설정 (캐시·보안 헤더)
├── .vercelignore                 # 배포에서 제외할 파일
└── robots.txt
```

## 2. 페이지 구성

| 섹션 | 위치 (`index.html`) | 내용 |
| --- | --- | --- |
| Header | `<header class="header">` | 로고, 메뉴, 문의하기 버튼 (모바일은 전체화면 메뉴) |
| Hero | `#top` | 메인 문구 "공간에 자연의 감각을 더하다." |
| About | `#about` | 브랜드 소개 01 ~ 04 |
| Service | `#service` | 4개 카테고리 카드 (클릭 시 포트폴리오 필터 적용) |
| Portfolio | `#portfolio` | 카테고리 필터 + 사진 갤러리 + 크게 보기 |
| Contact | `#contact` | 전화 · 메일 · 주소 · 지도 링크 |
| Footer | `<footer>` | 업체 정보 |

모바일에서는 화면 하단에 **전화 문의 / 메일 문의** 바가 고정으로 표시됩니다.

## 3. 업체 정보

| 항목 | 내용 |
| --- | --- |
| 상호 | VIRIDIS |
| 주소 | 장곡로628번길 10 금오종합상가 A106 루나즈플라워 |
| 메일 | viridia2024@naver.com |
| 전화 | 010-4581-7469 |

연락처가 바뀌면 `index.html`에서 아래를 검색해 모두 바꿔 주세요.
`010-4581-7469`, `01045817469`, `viridia2024@naver.com`, `장곡로628번길`
(문의 섹션, 푸터, 모바일 하단 바, 검색엔진용 정보(`application/ld+json`)에 들어 있습니다.)

## 4. 자주 하는 수정

### 포트폴리오 사진 추가

1. 원본 사진을 웹용으로 변환합니다 (Python 3 + Pillow 필요).

   ```bash
   pip install Pillow
   python3 scripts/optimize-images.py <원본사진폴더> assets/images/portfolio/office office
   ```

   - `office-01-800.webp`(목록용), `office-01-1600.webp`(크게 보기용) 형태로 만들어집니다.
   - 사진 회전이 자동으로 바로잡히고, 위치정보 등 메타데이터는 제거됩니다.
   - 기존 사진에 이어 추가하려면 새 사진만 따로 변환한 뒤 파일 번호를 이어서 바꿔 주세요.

2. `assets/js/portfolio-data.js`의 `items`에 한 줄을 추가합니다.

   ```js
   { category: "office", file: "office-10", title: "새 프로젝트 이름" },
   ```

   목록 순서가 곧 사이트에 보이는 순서입니다.

### 사진 제목 수정
`portfolio-data.js`의 `title` 값을 바꿉니다. (현재 제목은 사진을 보고 붙인 임시 설명이므로 실제 현장명으로 바꿔도 좋습니다.)

### 카테고리 설명 · 대표 사진 변경
`portfolio-data.js`의 `categories`에서 `desc`(설명), `cover`(대표 사진 파일명)를 바꿉니다.

### 색상 · 폰트 변경
`assets/css/style.css` 맨 위 `:root`에서 한 번에 바꿀 수 있습니다.

| 토큰 | 색상 | 용도 |
| --- | --- | --- |
| `--sage` | `#53664a` 딥 세이지 | 메인 컬러, 버튼, 소개 섹션 배경 |
| `--olive` | `#a5ad91` 올리브 | 포인트(번호, 라벨) |
| `--ivory` | `#f5f1e8` 아이보리 | 기본 배경 |
| `--charcoal` | `#393c34` 차콜 | 문의 섹션 배경, 본문 |

폰트 (모두 **SIL Open Font License** — 상업적 무료 사용 가능, CDN으로 불러옴)

| 폰트 | 용도 | 출처 |
| --- | --- | --- |
| 고운바탕 (Gowun Batang) | 한글 제목 | Google Fonts |
| Pretendard | 본문 | jsDelivr (orioncactus/pretendard) |
| Cormorant Garamond | 영문 포인트 (VIRIDIS, 번호, 라벨) | Google Fonts |

### 메인 사진 변경
`index.html`의 히어로(`hero__img--main`, `hero__img--sub`) 이미지 경로와,
`<head>`의 `<link rel="preload" ...>` 경로를 함께 바꿉니다.

## 5. 로컬에서 미리보기

```bash
python3 -m http.server 8080
```

브라우저에서 http://localhost:8080 접속
(`index.html`을 더블클릭하면 이미지 경로가 `/`로 시작해 사진이 안 보일 수 있으니 위 방법을 사용하세요.)

## 6. Vercel 배포

1. [vercel.com](https://vercel.com) 로그인 → **Add New… → Project**
2. 이 GitHub 저장소를 선택 → **Import**
3. 설정은 기본값 그대로 둡니다.
   - Framework Preset: **Other**
   - Build Command: 비워둠
   - Output Directory: 비워둠 (루트 그대로 배포)
4. **Deploy** 클릭

이후 `main` 브랜치에 push하면 자동으로 다시 배포됩니다.

### 도메인 연결 후 할 일
- Vercel 프로젝트 → Settings → Domains 에서 도메인 연결
- `index.html`의 `og:url`, `og:image` 주소(현재 viridis-blush.vercel.app)를 새 도메인으로 바꿔 주세요.
  카카오톡은 미리보기를 캐시하므로, 바꾼 뒤 카카오 공유 디버거(developers.kakao.com/tool/debugger/sharing)에서 초기화하세요.
- 네이버 서치어드바이저 / 구글 서치콘솔에 사이트 등록 (검색 노출)

## 7. 기술 메모 (인수인계용)

- 프레임워크·빌드 없음. 브라우저 기본 기능만 사용 (`<dialog>`, `IntersectionObserver`).
- 포트폴리오와 서비스 카드는 `portfolio-data.js` 데이터를 `main.js`가 화면에 그립니다.
- 이미지는 WebP 2가지 크기(800 / 1600px). 목록은 지연 로딩(lazy) 처리.
- CSS/JS를 수정하면 `index.html`의 `?v=3` 숫자를 올려 주세요. (방문자 브라우저에 예전 파일이 남지 않도록)
- 접근성: 본문 바로가기 링크, 키보드 조작(←/→/Esc), `prefers-reduced-motion` 대응.
- 원본 사진은 저장소에 포함하지 않았습니다 (용량 문제). 원본은 업체 측에서 보관합니다.
- 향후 문의 폼, 인스타그램 연동, 다국어 등이 필요하면 Astro / Next.js 등으로 이전을 권장합니다.
  현재 구조(섹션별 마크업 + 데이터 파일)가 그대로 옮기기 쉽게 나뉘어 있습니다.

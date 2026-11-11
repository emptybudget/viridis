/**
 * 포트폴리오 데이터
 * ------------------------------------------------------------
 * 사진을 추가/삭제/순서 변경할 때는 이 파일만 수정하면 됩니다.
 *
 * 사진 추가 방법
 *   1) scripts/optimize-images.py 로 이미지를 변환해
 *      assets/images/portfolio/<카테고리>/ 폴더에 넣습니다.
 *      (예: office-10-800.webp, office-10-1600.webp)
 *   2) 아래 items 배열에 { category, file, title } 한 줄을 추가합니다.
 *      file 은 "-800.webp" / "-1600.webp" 를 뺀 이름입니다.
 *
 * 목록 순서 = 사이트에 보이는 순서입니다.
 */
window.VIRIDIS_DATA = {
  categories: [
    {
      id: "office",
      label: "OFFICE",
      name: "사무실 및 기업 공간",
      desc: "업무 공간과 로비, 라운지에 편안한 초록의 쉼을 더합니다.",
      cover: "office-01",
    },
    {
      id: "commercial",
      label: "COMMERCIAL",
      name: "카페 · 매장 · 상업공간",
      desc: "브랜드 분위기에 맞춘 식재로 머물고 싶은 공간을 만듭니다.",
      cover: "commercial-01",
    },
    {
      id: "floral",
      label: "FLORAL",
      name: "실크플라워 연출",
      desc: "시들지 않는 실크플라워로 섬세한 플라워 장면을 완성합니다.",
      cover: "floral-01",
    },
    {
      id: "event",
      label: "EVENT",
      name: "행사 및 시즌 공간 장식",
      desc: "크리스마스 등 시즌 장식과 행사 공간을 특별하게 연출합니다.",
      cover: "event-01",
    },
  ],

  items: [
    // ---------- OFFICE ----------
    { category: "office", file: "office-01", title: "오피스 라운지 플랜테리어" },
    { category: "office", file: "office-02", title: "로비 그린 클러스터" },
    { category: "office", file: "office-03", title: "코너 포인트 플랜트" },
    { category: "office", file: "office-04", title: "휴게 공간 대형 식물" },
    { category: "office", file: "office-05", title: "파티션 플랜터 식재" },
    { category: "office", file: "office-06", title: "파티션 플랜터 디테일" },
    { category: "office", file: "office-07", title: "업무 공간 Before & After" },
    { category: "office", file: "office-08", title: "대기 공간 우드 플랜터" },
    { category: "office", file: "office-09", title: "창가 우드 플랜터" },

    // ---------- COMMERCIAL ----------
    { category: "commercial", file: "commercial-01", title: "테라스 실내 정원" },
    { category: "commercial", file: "commercial-02", title: "라운지 하우스 프레임 식재" },
    { category: "commercial", file: "commercial-03", title: "테라스 가든 코너" },
    { category: "commercial", file: "commercial-04", title: "모스 & 유카 실내 정원" },
    { category: "commercial", file: "commercial-05", title: "벽면 포인트 트리" },
    { category: "commercial", file: "commercial-06", title: "하우스 프레임 플랜터" },
    { category: "commercial", file: "commercial-07", title: "오픈 선반 그린 데코" },
    { category: "commercial", file: "commercial-08", title: "프레임 플랜터 디테일" },
    { category: "commercial", file: "commercial-09", title: "테라스 가든 산책길" },
    { category: "commercial", file: "commercial-10", title: "행잉 그린 연출" },

    // ---------- FLORAL ----------
    { category: "floral", file: "floral-01", title: "아치 무대 플라워 연출" },
    { category: "floral", file: "floral-02", title: "숲 테마 플라워 가든" },
    { category: "floral", file: "floral-03", title: "화이트 & 그린 플라워" },
    { category: "floral", file: "floral-04", title: "우드 스텀프 가든" },
    { category: "floral", file: "floral-05", title: "그린 수국 어레인지" },
    { category: "floral", file: "floral-06", title: "스톤 & 모스 가든" },
    { category: "floral", file: "floral-07", title: "아치 플라워 디테일" },

    // ---------- EVENT ----------
    { category: "event", file: "event-01", title: "크리스마스 트리 연출" },
    { category: "event", file: "event-02", title: "크리스마스 트리 & 플라워" },
    { category: "event", file: "event-03", title: "로비 크리스마스 트리" },
    { category: "event", file: "event-04", title: "추모 공간 플라워 테이블" },
    { category: "event", file: "event-05", title: "크리스마스 트리 디테일" },
    { category: "event", file: "event-06", title: "추모 플라워 디테일" },
    { category: "event", file: "event-07", title: "시즌 트리 연출" },
  ],
};

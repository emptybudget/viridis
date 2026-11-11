/**
 * VIRIDIS 사이트 스크립트
 * - 서비스 카드 / 포트폴리오 목록 생성 (데이터: portfolio-data.js)
 * - 카테고리 필터, 사진 크게 보기(라이트박스)
 * - 헤더 스크롤 효과, 모바일 메뉴, 스크롤 등장 애니메이션
 */
(function () {
  "use strict";

  var data = window.VIRIDIS_DATA;
  var IMG_PATH = "/assets/images/portfolio/";

  function src(file, size) {
    var category = file.split("-")[0];
    return IMG_PATH + category + "/" + file + "-" + size + ".webp";
  }

  function categoryById(id) {
    return data.categories.find(function (c) { return c.id === id; });
  }

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (html != null) node.innerHTML = html;
    return node;
  }

  /* ---------- 서비스 카드 ---------- */
  var serviceGrid = document.getElementById("serviceGrid");
  data.categories.forEach(function (c, i) {
    var card = el("a", { class: "service-card reveal", href: "#portfolio", "data-filter": c.id });
    card.innerHTML =
      '<div class="service-card__img"><img src="' + src(c.cover, 800) + '" alt="' + c.name + ' 연출 사례" loading="lazy" width="600" height="800" /></div>' +
      '<div class="service-card__body">' +
        '<span class="service-card__num">0' + (i + 1) + "</span>" +
        "<h3>" + c.label + "</h3>" +
        '<p class="service-card__name">' + c.name + "</p>" +
        '<p class="service-card__desc">' + c.desc + "</p>" +
        '<span class="service-card__more">작업 보기 &rarr;</span>' +
      "</div>";
    card.addEventListener("click", function () { setFilter(c.id); });
    serviceGrid.appendChild(card);
  });

  /* ---------- 포트폴리오 ---------- */
  var gallery = document.getElementById("gallery");
  var filterBox = document.getElementById("filter");
  var currentFilter = "all";

  var filters = [{ id: "all", label: "ALL" }].concat(data.categories);
  filters.forEach(function (f) {
    var btn = el("button", { type: "button", role: "tab", "data-filter": f.id, "aria-selected": f.id === "all" ? "true" : "false" }, f.label);
    btn.addEventListener("click", function () { setFilter(f.id); });
    filterBox.appendChild(btn);
  });

  data.items.forEach(function (item, index) {
    var cat = categoryById(item.category);
    var li = el("li", { class: "gallery__item", "data-category": item.category });
    li.innerHTML =
      '<button type="button" class="gallery__btn" data-index="' + index + '" aria-label="' + item.title + ' 크게 보기">' +
        '<img src="' + src(item.file, 800) + '" alt="' + item.title + '" loading="lazy" decoding="async" width="600" height="750" />' +
        '<span class="gallery__caption"><small>' + cat.label + "</small>" + item.title + "</span>" +
      "</button>";
    gallery.appendChild(li);
  });

  function setFilter(id) {
    currentFilter = id;
    filterBox.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-selected", b.dataset.filter === id ? "true" : "false");
    });
    gallery.querySelectorAll(".gallery__item").forEach(function (li) {
      var show = id === "all" || li.dataset.category === id;
      li.hidden = !show;
    });
  }

  /* ---------- 라이트박스 ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCat = document.getElementById("lbCat");
  var lbTitle = document.getElementById("lbTitle");
  var lbCount = document.getElementById("lbCount");
  var visibleList = [];
  var pos = 0;

  function visibleIndexes() {
    return data.items
      .map(function (item, i) { return { item: item, i: i }; })
      .filter(function (x) { return currentFilter === "all" || x.item.category === currentFilter; })
      .map(function (x) { return x.i; });
  }

  function show(p) {
    pos = (p + visibleList.length) % visibleList.length;
    var item = data.items[visibleList[pos]];
    lbImg.src = src(item.file, 1600);
    lbImg.alt = item.title;
    lbCat.textContent = categoryById(item.category).label;
    lbTitle.textContent = item.title;
    lbCount.textContent = pos + 1 + " / " + visibleList.length;
    // 다음 사진 미리 불러오기
    var next = data.items[visibleList[(pos + 1) % visibleList.length]];
    new Image().src = src(next.file, 1600);
  }

  gallery.addEventListener("click", function (e) {
    var btn = e.target.closest(".gallery__btn");
    if (!btn) return;
    visibleList = visibleIndexes();
    show(visibleList.indexOf(Number(btn.dataset.index)));
    lb.showModal();
    document.body.classList.add("is-locked");
  });

  lb.addEventListener("click", function (e) {
    var action = e.target.dataset.lb;
    if (action === "prev") show(pos - 1);
    else if (action === "next") show(pos + 1);
    else if (action === "close" || e.target === lb) lb.close();
  });
  lb.addEventListener("close", function () { document.body.classList.remove("is-locked"); });
  document.addEventListener("keydown", function (e) {
    if (!lb.open) return;
    if (e.key === "ArrowLeft") show(pos - 1);
    if (e.key === "ArrowRight") show(pos + 1);
  });

  // 모바일 스와이프
  var startX = null;
  lb.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(dx < 0 ? pos + 1 : pos - 1);
    startX = null;
  });

  /* ---------- 헤더 & 모바일 메뉴 ---------- */
  var header = document.getElementById("header");
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("nav");

  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 20); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  }
  toggle.addEventListener("click", function () { setMenu(!header.classList.contains("is-open")); });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });

  /* ---------- 스크롤 등장 애니메이션 ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("is-visible"); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();

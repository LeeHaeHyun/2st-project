const searchInput = document.querySelector("#search-form input");
const searchForm = document.querySelector("#search-form");
const searchArea = document.querySelector("#searchArea");

const HIDDEN_CLASSNAME = "hidden";

function onSearchSubmit(event) {
  event.preventDefault();
  searchForm.classList.add(HIDDEN_CLASSNAME);
  const locationname = searchInput.value;
  localStorage.setItem("locationname", locationname);
  console.log(locationname);
  window.open(
    "https://twitter.com/search?q=" +
      //장소
      locationname +
      //해시태그
      "%23한식맛집 OR " +
      "%23중식맛집 OR " +
      "%23일식맛집 OR " +
      "%23양식맛집 OR " +
      "%23맛집 OR " +
      "%23꿀팁 OR " +
      "%23직장인 OR " +
      "%23야식 OR " +
      "%23추천 OR " +
      "%23후기 OR " +
      "%23서울맛집 OR " +
      "%23경기도맛집 OR " +
      "%23맛집내비게이션 OR " +
      "%23맛집탐험 OR " +
      "%23국내여행 OR " +
      "%23해외여행 OR " +
      "%23베스트맛집 OR " +
      "%23맛집순위 OR " +
      "%23여행지추천 OR " +
      "%23세븐틴 OR " +
      "%23txt OR " +
      "%23투모로우바이투게더 OR " +
      "%23슈퍼주니어 OR " +
      "%23JMT OR " +
      "%23생생정보 OR " +
      "%23데이트 OR " +
      "%23데이트코스 OR " +
      "%23먹방 OR " +
      "%23간식 OR " +
      "%23가볼만한곳 OR " +
      "%23꿀맛 OR " +
      "%23일상 OR " +
      "%23초코 OR " +
      "%23점심메뉴 OR " +
      "%23점심 OR " +
      "%23치즈 OR " +
      "%23고기 OR " +
      "%23다이어트 OR " +
      "&src=typed_query&f=top"
  );

  // 검색 후 창 새로고침
  location.reload();
}

searchForm.addEventListener("submit", onSearchSubmit);

import { openModal, closeModal } from "./modal.js";

const $ = (selector) => document.querySelector(selector);

$(".btn-open-modal").addEventListener("click", () => {
  openModal();
});

$(".modal-container").addEventListener("click", (event) => {
  if (event.target === $(".modal-container")) {
    closeModal();
  }
});

$(".modal-close").addEventListener("click", () => {
  closeModal();
});

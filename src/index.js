import SeacrchApiService from "./fetch-axios-api";
import renderImgMarcup from "./renderImgMarcup";

const refs = {
   serchFrom: document.querySelector('.search-form'),
   hitsGalerry: document.querySelector('.gallery'),
   loadMoreBtn: document.querySelector('.load-more'),
}

const seacrchApiService = new SeacrchApiService();
console.log(seacrchApiService);

refs.serchFrom.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e){
   e.preventDefault();

   seacrchApiService.query = e.currentTarget.elements.searchQuery.value;
   seacrchApiService.resetPage();
   seacrchApiService.fetchHits().then(appendHitsMarcup);
}

function onLoadMore() {
   seacrchApiService.fetchHits().then(appendHitsMarcup);
}

function appendHitsMarcup(hits) {
   refs.hitsGalerry.insertAdjacentHTML('beforeend', renderImgMarcup(hits));
}
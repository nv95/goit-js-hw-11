import SeacrchApiService from "./fetch-axios-api";
import renderImgMarcup from "./renderImgMarcup";
import Notiflix from "notiflix";

const refs = {
   serchFrom: document.querySelector('.search-form'),
   hitsGalerry: document.querySelector('.gallery'),
   loadMoreBtn: document.querySelector('.load-more'),
}

const seacrchApiService = new SeacrchApiService();

refs.serchFrom.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e){
   e.preventDefault();

   
   seacrchApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
   
   if(seacrchApiService.searchQuery ===''){
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
   }

   seacrchApiService.resetPage();
   seacrchApiService.fetchHits().then( hits =>{
      clearHitsGallery()
      appendHitsMarcup(hits)});
}

function onLoadMore() {
   seacrchApiService.fetchHits().then(appendHitsMarcup);
}

function appendHitsMarcup(hits) {
   refs.hitsGalerry.insertAdjacentHTML('beforeend', renderImgMarcup(hits));
}

function clearHitsGallery(){
   refs.hitsGalerry.innerHTML = '';
}
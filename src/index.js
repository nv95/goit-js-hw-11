import SeacrchApiService from "./fetch-axios-api";
import renderImgMarcup from "./renderImgMarcup";
import Notiflix from "notiflix";

let startAmount = 40;

const refs = {
   serchFrom: document.querySelector('.search-form'),
   hitsGalerry: document.querySelector('.gallery'),
   loadMoreBtn: document.querySelector('.load-more'),
};

const seacrchApiService = new SeacrchApiService();

refs.serchFrom.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

refs.loadMoreBtn.classList.add('visually-hidden');

function onSearch(e){
   e.preventDefault();

   refs.loadMoreBtn.classList.add('visually-hidden');
 
   seacrchApiService.query = e.currentTarget.elements.searchQuery.value.trim();

   if(!seacrchApiService.query){
      return Notiflix.Notify.failure('Your search bar is empty, please write valid value');
   } 

   seacrchApiService.resetPage();
   seacrchApiService.fetchHits().then(hits =>{
      if(hits.length === 0){
         refs.loadMoreBtn.classList.add('visually-hidden');
         return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }
      clearHitsGallery();  
      appendHitsMarcup(hits);
      refs.loadMoreBtn.classList.remove('visually-hidden');

      if(seacrchApiService.page === 2) {
         Notiflix.Notify.success(`Hooray! We found ${seacrchApiService.totalHits} images.`);
      }
   });
}

function onLoadMore() {
   seacrchApiService.fetchHits().then(hits =>{
      appendHitsMarcup(hits);

      startAmount += hits.length;
   });
}

function appendHitsMarcup(hits) {
   refs.hitsGalerry.insertAdjacentHTML('beforeend', renderImgMarcup(hits));
}

function clearHitsGallery(){
   refs.hitsGalerry.innerHTML = '';
}
// APIServices
import SeacrchApiService from "./fetch-axios-api";
// render gallery
import renderImgMarcup from "./renderImgMarcup";
// popups
import Notiflix from "notiflix";
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

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

async function onSearch(e){
   e.preventDefault();

   refs.loadMoreBtn.classList.add('visually-hidden');
 
   seacrchApiService.query = e.currentTarget.elements.searchQuery.value.trim();

   if(!seacrchApiService.query){
      return Notiflix.Notify.failure('Your search bar is empty, please write valid value');
   } 

   seacrchApiService.resetPage();

   // seacrchApiService.fetchHits().then(({hits,totalHits}) =>{
   //    if(hits.length === 0){
   //       console.log(hits);
   //       refs.loadMoreBtn.classList.add('visually-hidden');
   //       return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   //    }

   //    if (seacrchApiService.page === 2) { 
   //       Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
   //    }

   //    if (hits.length < 40){
   //       refs.loadMoreBtn.classList.add('visually-hidden');
   //       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
   //    }

   //    clearHitsGallery();  
   //    appendHitsMarcup(hits);
   //    refs.loadMoreBtn.classList.remove('visually-hidden');
   //    let gallery = new SimpleLightbox('.gallery a', {
   //        captions: true,
   //        captionsData: 'alt',
   //        captionDelay: 250,
   //      });
   //      gallery.refresh();

   // });

   try {
      const data = await seacrchApiService.fetchHits();
  
      if(data.hits.length === 0){
          console.log(data.hits.length);
          refs.loadMoreBtn.classList.add('visually-hidden');
          return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
       }
  
       if (seacrchApiService.page === 2) { 
         console.log(seacrchApiService.page);
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
       }
  
       if (data.hits.length < 40){
          refs.loadMoreBtn.classList.add('visually-hidden');
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
       }
  
       clearHitsGallery();  
       appendHitsMarcup(data.hits);
       refs.loadMoreBtn.classList.remove('visually-hidden');
       let gallery = new SimpleLightbox('.gallery a', {
           captions: true,
           captionsData: 'alt',
           captionDelay: 250,
         });
         gallery.refresh();
  }

}

async function onLoadMore() {
   // seacrchApiService.fetchHits().then(({hits}) =>{
   //    appendHitsMarcup(hits);

   //    startAmount += hits.length;
   //    if(startAmount === seacrchApiService.totalHits) {
   //       refs.loadMoreBtn.classList.add('visually-hidden');
   //       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");         
   //    }
   // });

   try {
      const data = await seacrchApiService.fetchHits();
          appendHitsMarcup(data.hits);
  
          startAmount += data.hits.length;
  
          if(startAmount === seacrchApiService.totalHits) {
             refs.loadMoreBtn.classList.add('visually-hidden');
             Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");         
          }
  }

}

function appendHitsMarcup(hits) {
   refs.hitsGalerry.insertAdjacentHTML('beforeend', renderImgMarcup(hits));
}

function clearHitsGallery(){
   refs.hitsGalerry.innerHTML = '';
}
function e(e){return e.map((({webformatURL:e,largeImageURL:n,tags:t,likes:s,views:a,comments:r,downloads:i})=>`\n        <div class="photo-card">\n            <a class="gallery__item" href="${n}"\n            <img class="gallery__image" data-source="${n}" src="${e}" alt="${t}" loading="lazy" width="285" height="190"/>\n            </a>\n            <div class="info">\n                <p class="info-item">\n                    <b>Likes :</b>\n                    <span class="info-item__value">${s}</span>\n                </p>\n                <p class="info-item">\n                    <b>Views :</b>\n                    <span class="info-item__value">${a}</span>\n                </p>\n                <p class="info-item">\n                    <b>Comments :</b>\n                    <span class="info-item__value">${r}</span>\n                </p>\n                <p class="info-item">\n                    <b>Downloads :</b>\n                    <span class="info-item__value">${i}</span>\n                </p>\n            </div>\n        </div>\n        `)).join("")}const n={serchFrom:document.querySelector(".search-form"),hitsGalerry:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")},t=new class{fetchHits(){return fetch(`https://pixabay.com/api/?key=33395232-2c7298051ec43baaf859d6c71&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`).then((e=>e.json())).then((e=>(this.incrementPage(),e.hits)))}incrementPage(){this.page+=1}resetPage(){this.page=1}get query(){return this.searchQuery}set query(e){this.searchQuery=e}constructor(){this.searchQuery="",this.page=1}};function s(t){n.hitsGalerry.insertAdjacentHTML("beforeend",e(t))}console.log(t),n.serchFrom.addEventListener("submit",(function(e){e.preventDefault(),t.query=e.currentTarget.elements.searchQuery.value,t.resetPage(),t.fetchHits().then(s)})),n.loadMoreBtn.addEventListener("click",(function(){t.fetchHits().then(s)}));
//# sourceMappingURL=index.0cf35ffd.js.map

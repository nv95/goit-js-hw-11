export default function renderImgMarcup(hits) {

    return hits
    .map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads})=>{
        return`
        <div class="photo-card">
            <a class="gallery__item" href="${largeImageURL}"
            <img class="gallery__image" data-source="${largeImageURL}" src="${webformatURL}" alt="${tags}" loading="lazy" width="285" height="190"/>
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes :</b>
                    <span class="info-item__value">${likes}</span>
                </p>
                <p class="info-item">
                    <b>Views :</b>
                    <span class="info-item__value">${views}</span>
                </p>
                <p class="info-item">
                    <b>Comments :</b>
                    <span class="info-item__value">${comments}</span>
                </p>
                <p class="info-item">
                    <b>Downloads :</b>
                    <span class="info-item__value">${downloads}</span>
                </p>
            </div>
        </div>
        `;
    })
    .join('');
}
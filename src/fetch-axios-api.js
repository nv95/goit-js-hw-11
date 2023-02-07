
export default class SeacrchApiService {
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }

    fetchHits(){
    const API_KEY = '33395232-2c7298051ec43baaf859d6c71';
    const BASE_URL = 'https://pixabay.com/api/';

        return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
        .then(res => res.json())
        .then(data =>{
            this.incrementPage();

            return data.hits;
        });
    }

    incrementPage(){
        this.page +=1
    }
     
    resetPage() {
        this.page = 1;
    }

    get query(){
        return this.searchQuery;
    }
    set query(newQuery){
        this.searchQuery = newQuery;
    }
 
}
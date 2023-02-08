import axios from "axios";

const API_KEY = '33395232-2c7298051ec43baaf859d6c71';
const BASE_URL = 'https://pixabay.com/api/';

export default class SeacrchApiService {
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }
// fetch()
    // fetchHits(){
    //     const url =`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    //     return fetch(url)
    //     .then(response => response.json())
    //     .then((data) =>{
    //         console.log(data);
    //         this.incrementPage();

    //         return data;
    //     })
    // }

    async fetchHits() {
        const url =`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

            const response = await axios.get(url);
            this.incrementPage();

            return response.data;
    }

    incrementPage(){
        this.page +=1;
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
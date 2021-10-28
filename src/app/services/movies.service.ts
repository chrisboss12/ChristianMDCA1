import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Typescript custom enum for search types (optional)
export enum SearchType {
  all = '',
  movie = 'movie',
  tv = 'tv'
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  url = 'https://api.themoviedb.org/3/search/';
  url2 = 'https://api.themoviedb.org/3/search/multi';
  language = 'en-IE';
  apiKey = '432ba2e02bf8374a08e49b4267771983'; // <-- Enter your own key here!
 
  /**
   * Constructor of the Service with Dependency Injection
   * @param http The standard Angular HttpClient to make requests
   */
  constructor(private http: HttpClient) { }
 
  /**
  * Get data from the OmdbApi 
  * map the result to return only the results that we need
  * 
  * @param {string} title Search Term
  * @param {SearchType} type movie, series, episode or empty
  * @returns Observable with the search results
  */
  searchData(title: string, type: SearchType): Observable<any> {
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
      map(results => results['Search'])
    );
  }
 
  /**
  * Get the detailed information for an ID using the "i" parameter
  * 
  * @param {string} id imdbID to retrieve information
  * @returns Observable with detailed information
  */
  getDetails(id) {
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }

  /**
   * Search multiple models in a single request. Multi search currently supports searching for movies, tv shows and people in a single request.
   * Maps the result to return the only serached result we need
   * 
   * @param {string} movie Search term
   * @returns Observable with the search results
   */
  searchMulti(movie: string): Observable<any> {
    return this.http.get(`${this.url2}?query=${encodeURI(movie)}&api_key=${this.apiKey}&language=${this.language}&page=1&include_adult=false`).pipe(
      map(results => {
        console.log('RAW: ', results);
        return results['Search'];
    })
    );
  }

  /**
   * Get the primary TV show details by id.
   * 
   * @param {string} id themoviedbID to retrieve information 
   * @returns Observable with detailed tv information
   */
  getTvDetails(id){
    return this.http.get(`${this.url}tv/${id}?api_key=${this.apiKey}&language=${this.language}`);
  }

  /**
   * Get the primary Movie information details by id.
   * 
   * @param {string} id themoviedbID to retrieve information
   * @returns Observable with detailed movie information
   */
  getMovieDetails(id){
    return this.http.get(`${this.url}movie/${id}?api_key=${this.apiKey}&language=${this.language}`)
  }
}
